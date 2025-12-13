import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseAdmin = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function POST(request: NextRequest) {
  try {
    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Missing required field: applicationId' },
        { status: 400 }
      );
    }

    // Get application details with job and tradesperson info
    const { data: application, error: fetchError } = await supabaseAdmin
      .from('job_applications')
      .select(`
        *,
        jobs (
          id,
          trade,
          job_description,
          postcode,
          budget,
          budget_type,
          clients (
            id,
            first_name,
            last_name,
            email
          )
        ),
        tradespeople (
          id,
          first_name,
          last_name,
          email,
          trade,
          years_experience,
          hourly_rate,
          phone
        )
      `)
      .eq('id', applicationId)
      .single();

    if (fetchError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Update application status to approved
    const { error: updateError } = await supabaseAdmin
      .from('job_applications')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error('Error updating application:', updateError);
      return NextResponse.json(
        { error: 'Failed to approve application' },
        { status: 500 }
      );
    }

    // Send email notification to tradesperson (best effort)
    try {
      if (application.tradespeople?.email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'myapproved2024@gmail.com',
            pass: 'qjqj qjqj qjqj qjqj'
          }
        });

        await transporter.sendMail({
          from: '"My Approved" <myapproved2024@gmail.com>',
          to: application.tradespeople.email,
          subject: 'Application Approved - Job Assignment',
          html: `
            <h2>Congratulations! Your application has been approved</h2>
            <p>Hello ${application.tradespeople.first_name} ${application.tradespeople.last_name},</p>
            <p>Your application for the ${application.jobs.trade} job has been approved by the admin.</p>
            <p><strong>Job Details:</strong></p>
            <ul>
              <li>Trade: ${application.jobs.trade}</li>
              <li>Location: ${application.jobs.postcode}</li>
              <li>Budget: £${application.jobs.budget} (${application.jobs.budget_type})</li>
              <li>Your Quote: £${application.quotation_amount}</li>
            </ul>
            <p>You can now proceed with the job. Please contact the client if needed.</p>
            <p>Best regards,<br>My Approved Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true,
      message: 'Application approved successfully'
    });

  } catch (error: any) {
    console.error('Error approving application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
