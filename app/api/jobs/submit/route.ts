import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
let supabase;
try {
  supabase = createClient(
    'https://jismdkfjkngwbpddhomx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
  );
} catch (error) {
  console.error('Failed to create Supabase client:', error);
  throw new Error('Supabase client initialization failed');
}

export async function POST(request: NextRequest) {
  console.log('=== JOB SUBMISSION API CALLED ===');
  
  try {
    const jobData = await request.json();
    console.log('Job submission data received:', jobData);
    
    // Check if client is authenticated
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required',
        message: 'Please log in to submit a job'
      }, { status: 401 });
    }

    // Extract client ID from the token or session
    // For now, we'll get it from the request body, but ideally it should come from the JWT token
    const clientId = jobData.clientId;
    if (!clientId) {
      return NextResponse.json({
        success: false,
        error: 'Client ID required',
        message: 'Please log in to submit a job'
      }, { status: 401 });
    }

    // Verify the client exists
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id, first_name, last_name, email')
      .eq('id', clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json({
        success: false,
        error: 'Invalid client',
        message: 'Please log in to submit a job'
      }, { status: 401 });
    }

    // Validate required fields
    const requiredFields = ['trade', 'description', 'postcode', 'urgency'];
    const missingFields = requiredFields.filter(field => !jobData[field]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
        message: 'Invalid job data'
      }, { status: 400 });
    }

    // Create job submission with existing table structure
    const jobInsertData = {
      client_id: clientId,
      trade: jobData.trade,
      job_description: jobData.description,
      postcode: jobData.postcode,
      budget: jobData.budget || null,
      budget_type: jobData.budgetType || 'fixed',
      preferred_date: jobData.preferredDate || null,
      preferred_time: 'any', // Default to 'any' since we don't have this field in form
      status: 'pending_approval', // New jobs need admin approval
      is_approved: false,
      images: jobData.images || []
    };
    
    console.log('Inserting job data:', jobInsertData);
    
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert(jobInsertData)
      .select()
      .single();

    if (jobError) {
      console.error('Error creating job:', jobError);
      return NextResponse.json({
        success: false,
        error: 'Failed to create job submission',
        message: `Database error: ${jobError.message}`,
        details: jobError
      }, { status: 500 });
    }

    // Try to sync to CRM if configured
    try {
      const crmResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/crm/sync-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: job.id,
          clientName: jobData.clientName,
          clientEmail: jobData.clientEmail,
          clientPhone: jobData.clientPhone,
          trade: jobData.trade,
          jobDescription: jobData.description,
          location: jobData.postcode,
          budget: jobData.budget,
          budgetType: jobData.budgetType,
          preferredDate: jobData.preferredDate,
          status: 'pending_approval',
          createdAt: job.created_at
        }),
      });

      if (crmResponse.ok) {
        console.log('Job synced to CRM successfully');
      } else {
        console.log('CRM sync failed, but job was created');
      }
    } catch (crmError) {
      console.log('CRM sync error (non-critical):', crmError);
    }

    return NextResponse.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        message: 'Job submitted successfully and is pending admin approval'
      },
      message: 'Job submitted successfully'
    });

  } catch (error) {
    console.error('=== JOB SUBMISSION ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to submit job',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
