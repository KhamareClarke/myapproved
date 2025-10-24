import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize Supabase client
const supabase = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const trade = searchParams.get('trade') || '';
    const location = searchParams.get('location') || '';
    const tradespersonId = searchParams.get('tradespersonId') || '';

    console.log('Tradesperson jobs API called with filters:', {
      page,
      limit,
      trade,
      location,
      tradespersonId
    });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Get jobs the tradesperson has already applied to (if tradespersonId provided)
    let appliedJobIds: string[] = [];
    if (tradespersonId) {
      const { data: applications, error: applicationsError } = await supabase
        .from('job_applications')
        .select('job_id')
        .eq('tradesperson_id', tradespersonId);

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
      } else {
        appliedJobIds = applications?.map(app => app.job_id) || [];
        console.log(`Tradesperson ${tradespersonId} has applied to ${appliedJobIds.length} jobs:`, appliedJobIds);
      }
    }

    // Build query for available jobs that tradespeople can apply to
    let query = supabase
      .from('jobs')
      .select(`
        *,
        clients (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .eq('is_approved', true)
      .eq('is_completed', false)
      .is('assigned_tradesperson_id', null)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false });

    console.log('Initial query conditions: is_approved=true, is_completed=false, assigned_tradesperson_id=null, is_flagged=false');

    // Exclude jobs the tradesperson has already applied to
    if (appliedJobIds.length > 0) {
      console.log(`Excluding ${appliedJobIds.length} applied jobs from results:`, appliedJobIds);
      query = query.not('id', 'in', appliedJobIds);
    }

    // Apply filters with intelligent trade matching
    if (trade) {
      // Create flexible trade matching patterns
      const tradePatterns = [];
      const tradeLower = trade.toLowerCase();
      
      // Exact match
      tradePatterns.push(`trade.eq.${trade}`);
      
      // Case-insensitive partial match
      tradePatterns.push(`trade.ilike.%${trade}%`);
      
      // Handle common trade variations
      if (tradeLower.includes('electric')) {
        tradePatterns.push(`trade.ilike.%Electric%`);
        tradePatterns.push(`trade.ilike.%Electrical%`);
      }
      if (tradeLower.includes('plumb')) {
        tradePatterns.push(`trade.ilike.%Plumb%`);
        tradePatterns.push(`trade.ilike.%Plumbing%`);
      }
      if (tradeLower.includes('build')) {
        tradePatterns.push(`trade.ilike.%Build%`);
        tradePatterns.push(`trade.ilike.%Builder%`);
        tradePatterns.push(`trade.ilike.%Building%`);
      }
      if (tradeLower.includes('carpen')) {
        tradePatterns.push(`trade.ilike.%Carpen%`);
        tradePatterns.push(`trade.ilike.%Carpentry%`);
      }
      
      // Apply OR filter with all patterns
      console.log(`Trade matching patterns for "${trade}":`, tradePatterns);
      query = query.or(tradePatterns.join(','));
    }

    if (location) {
      // Match postcode prefix for area matching
      query = query.ilike('postcode', `${location}%`);
    }

    // Build count query with same filters
    let countQuery = supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true)
      .eq('is_completed', false)
      .is('assigned_tradesperson_id', null)
      .eq('is_flagged', false);

    // Exclude jobs the tradesperson has already applied to from count
    if (appliedJobIds.length > 0) {
      countQuery = countQuery.not('id', 'in', appliedJobIds);
    }

    // Apply same trade filters to count query
    if (trade) {
      // Create the same flexible trade matching patterns
      const tradePatterns = [];
      const tradeLower = trade.toLowerCase();
      
      // Exact match
      tradePatterns.push(`trade.eq.${trade}`);
      
      // Case-insensitive partial match
      tradePatterns.push(`trade.ilike.%${trade}%`);
      
      // Handle common trade variations
      if (tradeLower.includes('electric')) {
        tradePatterns.push(`trade.ilike.%Electric%`);
        tradePatterns.push(`trade.ilike.%Electrical%`);
      }
      if (tradeLower.includes('plumb')) {
        tradePatterns.push(`trade.ilike.%Plumb%`);
        tradePatterns.push(`trade.ilike.%Plumbing%`);
      }
      if (tradeLower.includes('build')) {
        tradePatterns.push(`trade.ilike.%Build%`);
        tradePatterns.push(`trade.ilike.%Builder%`);
        tradePatterns.push(`trade.ilike.%Building%`);
      }
      if (tradeLower.includes('carpen')) {
        tradePatterns.push(`trade.ilike.%Carpen%`);
        tradePatterns.push(`trade.ilike.%Carpentry%`);
      }
      
      // Apply OR filter with all patterns
      countQuery = countQuery.or(tradePatterns.join(','));
    }
    if (location) {
      countQuery = countQuery.ilike('postcode', `${location}%`);
    }

    const { count } = await countQuery;

    // Get paginated results
    const { data: jobs, error } = await query
      .range(from, to);

    if (error) {
      console.error('Error fetching tradesperson jobs:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch jobs',
        message: 'Database error',
        details: error
      }, { status: 500 });
    }

    console.log(`Found ${jobs?.length || 0} jobs matching filters (excluded ${appliedJobIds.length} already applied jobs)`);
    
    if (jobs && jobs.length > 0) {
      console.log('Job details:', jobs.map(j => ({
        id: j.id,
        trade: j.trade,
        status: j.status,
        isApproved: j.is_approved,
        isCompleted: j.is_completed,
        applicationStatus: j.application_status,
        assignedTradesperson: j.assigned_tradesperson_id,
        isFlagged: j.is_flagged,
        postcode: j.postcode
      })));
    } else {
      console.log('No jobs found. This could be due to:');
      console.log('- No jobs are approved (is_approved=true)');
      console.log('- All jobs are completed (is_completed=false)');
      console.log('- All jobs are assigned (assigned_tradesperson_id=null)');
      console.log('- All jobs are flagged (is_flagged=false)');
      console.log('- Trade/location filters are too restrictive');
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      success: true,
      data: {
        jobs: jobs || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages,
          hasMore: page < totalPages
        }
      },
      message: 'Jobs fetched successfully'
    });

  } catch (error) {
    console.error('Tradesperson jobs fetch error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch jobs'
    }, { status: 500 });
  }
}

