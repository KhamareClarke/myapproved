import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase project
const supabase = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debugging jobs status in database...');

    // Get all jobs with their status information
    const { data: allJobs, error: allError } = await supabase
      .from('jobs')
      .select('id, trade, status, is_approved, is_completed, application_status, assigned_tradesperson_id, is_flagged, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (allError) {
      console.error('Error fetching jobs:', allError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch jobs',
        details: allError.message
      }, { status: 500 });
    }

    console.log(`📊 Total jobs found: ${allJobs?.length || 0}`);

    // Check different status combinations
    const statusBreakdown = {
      total: allJobs?.length || 0,
      approved: allJobs?.filter(j => j.is_approved === true).length || 0,
      statusApproved: allJobs?.filter(j => j.status === 'approved').length || 0,
      notCompleted: allJobs?.filter(j => j.is_completed === false).length || 0,
      applicationOpen: allJobs?.filter(j => j.application_status === 'open').length || 0,
      notAssigned: allJobs?.filter(j => j.assigned_tradesperson_id === null).length || 0,
      notFlagged: allJobs?.filter(j => j.is_flagged === false).length || 0,
      allConditions: allJobs?.filter(j => 
        j.is_approved === true && 
        j.status === 'approved' && 
        j.is_completed === false && 
        j.application_status === 'open' && 
        j.assigned_tradesperson_id === null && 
        j.is_flagged === false
      ).length || 0
    };

    console.log('Status breakdown:', statusBreakdown);

    // Get unique status values
    const uniqueStatuses = Array.from(new Set(allJobs?.map(j => j.status) || []));
    const uniqueApplicationStatuses = Array.from(new Set(allJobs?.map(j => j.application_status) || []));

    return NextResponse.json({
      success: true,
      data: {
        totalJobs: allJobs?.length || 0,
        statusBreakdown,
        uniqueStatuses,
        uniqueApplicationStatuses,
        recentJobs: allJobs?.map(job => ({
          id: job.id,
          trade: job.trade,
          status: job.status,
          isApproved: job.is_approved,
          isCompleted: job.is_completed,
          applicationStatus: job.application_status,
          assignedTradesperson: job.assigned_tradesperson_id,
          isFlagged: job.is_flagged,
          createdAt: job.created_at
        })) || []
      },
      message: 'Jobs status analysis completed'
    });

  } catch (error) {
    console.error('Debug jobs status error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to debug jobs status'
    }, { status: 500 });
  }
}
