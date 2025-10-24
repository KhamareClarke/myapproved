import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Use the correct Supabase project (same as all other APIs)
const supabase = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function POST(request: NextRequest) {
  try {
    console.log('Job approval API called');
    const { jobId, action, adminNotes } = await request.json();
    console.log('Request data:', { jobId, action, adminNotes });
    
    if (!jobId || !action) {
      console.log('Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: jobId and action',
        message: 'Invalid request'
      }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid action. Must be "approve" or "reject"',
        message: 'Invalid action'
      }, { status: 400 });
    }

    // Update job status
    const updateData = {
      is_approved: action === 'approve',
      status: action === 'approve' ? 'approved' : 'rejected',
      application_status: action === 'approve' ? 'open' : null, // Make job available for applications when approved
      admin_notes: adminNotes || null,
      approved_at: action === 'approve' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    };

    console.log('Updating job with data:', updateData);
    const { data: job, error: updateError } = await supabase
      .from('jobs')
      .update(updateData)
      .eq('id', jobId)
      .select()
      .single();

    console.log('Update result:', { job, updateError });

    if (updateError) {
      console.error('Error updating job:', updateError);
      return NextResponse.json({
        success: false,
        error: 'Failed to update job status',
        message: 'Database error'
      }, { status: 500 });
    }

    if (!job) {
      return NextResponse.json({
        success: false,
        error: 'Job not found',
        message: 'Job not found'
      }, { status: 404 });
    }

    // Send email notifications (non-blocking)
    setTimeout(async () => {
      try {
        // Get client details for email notification
        const { data: client } = await supabase
          .from('clients')
          .select('first_name, last_name, email')
          .eq('id', job.client_id)
          .single();

        if (action === 'approve') {
          // Send approval email to client
          if (client) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'khamareclarke@gmail.com',
                pass: 'ovga hgzy rltc ifyh'
              }
            });

            const clientEmailContent = `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:8px;">
                <h2 style="color:#2d3748;">🎉 Your Job Has Been Approved!</h2>
                <p>Hello ${client.first_name} ${client.last_name},</p>
                <p>Great news! Your job posting has been approved by our admin team and is now live for tradespeople to apply.</p>
                
                <div style="background-color:#f7fafc;padding:16px;border-radius:8px;margin:16px 0;">
                  <h3 style="margin-top:0;">Your Job Details:</h3>
                  <p><strong>Trade:</strong> ${job.trade}</p>
                  <p><strong>Description:</strong> ${job.job_description}</p>
                  <p><strong>Location:</strong> ${job.postcode}</p>
                  <p><strong>Budget:</strong> £${job.budget || 'Not specified'} (${job.budget_type || 'fixed'})</p>
                  <p><strong>Preferred Date:</strong> ${job.preferred_date || 'Not specified'}</p>
                  ${job.images && job.images.length > 0 ? `<p><strong>Images:</strong> ${job.images.length} uploaded</p>` : ''}
                </div>
                
                <div style="background-color:#e6fffa;padding:16px;border-radius:8px;margin:16px 0;border-left:4px solid #38b2ac;">
                  <h4 style="margin-top:0;color:#2c7a7b;">✅ What happens next?</h4>
                  <p style="margin:0;color:#2c7a7b;">
                    Verified tradespeople in your area will now be notified about your job and can send you quotes. 
                    You'll receive quotes within 24 hours from qualified professionals.
                  </p>
                </div>
                
                <div style="text-align:center;margin:20px 0;">
                  <a href="http://localhost:3000/dashboard/client" 
                     style="background-color:#4299e1;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                    View Your Job Dashboard
                  </a>
                </div>
                
                <p style="color:#666;font-size:14px;margin-top:20px;">
                  You can now expect to receive quotes from verified tradespeople in your area. 
                  Compare their profiles, reviews, and prices before making your decision.
                </p>
              </div>
            `;

            const clientEmail = {
              from: 'My Approved <khamareclarke@gmail.com>',
              to: client.email,
              subject: 'Job Approved - Your Job is Now Live!',
              html: clientEmailContent
            };

            await transporter.sendMail(clientEmail);
            console.log('Client approval email sent to:', client.email);
          }

          // Send notification to matching tradespeople
          console.log('Looking for tradespeople matching trade:', job.trade);
          
          // Create trade variations for better matching
          const tradeVariations = [
            job.trade,
            job.trade.toLowerCase(),
            job.trade.toUpperCase(),
            // Handle common variations
            job.trade === 'Electrical' ? 'Electrician' : null,
            job.trade === 'Electrician' ? 'Electrical' : null,
            job.trade === 'Plumbing' ? 'Plumber' : null,
            job.trade === 'Plumber' ? 'Plumbing' : null,
            job.trade === 'Building' ? 'Builder' : null,
            job.trade === 'Builder' ? 'Building' : null,
            job.trade === 'Painting' ? 'Painter' : null,
            job.trade === 'Painter' ? 'Painting' : null,
          ].filter(Boolean);

          console.log('Trade variations to search:', tradeVariations);

          // Search for tradespeople with any of the trade variations
          const { data: allTradespeople, error: tradespeopleError } = await supabase
            .from('tradespeople')
            .select('id, first_name, last_name, email, trade, postcode, city, is_verified')
            .in('trade', tradeVariations)
            .eq('is_verified', true);

          if (tradespeopleError) {
            console.error('Error fetching tradespeople:', tradespeopleError);
          } else {
            console.log('Found tradespeople:', allTradespeople?.length || 0);
            if (allTradespeople && allTradespeople.length > 0) {
              console.log('Tradespeople found:', allTradespeople.map(t => `${t.first_name} ${t.last_name} (${t.trade})`));
            }
          }

          // If no tradespeople found with specific trade, try to find any verified tradespeople
          let finalTradespeople = allTradespeople;
          if (!finalTradespeople || finalTradespeople.length === 0) {
            console.log('No tradespeople found with specific trade, searching for any verified tradespeople...');
            const { data: anyTradespeople, error: anyError } = await supabase
              .from('tradespeople')
              .select('id, first_name, last_name, email, trade, postcode, city, is_verified')
              .eq('is_verified', true);
            
            if (anyError) {
              console.error('Error fetching any tradespeople:', anyError);
            } else {
              console.log('Found any verified tradespeople:', anyTradespeople?.length || 0);
              finalTradespeople = anyTradespeople;
            }
          }

          // Filter by location (postcode or city match)
          const matchingTradespeople = finalTradespeople?.filter(tradesperson => {
            const tradespersonLocation = tradesperson.postcode || tradesperson.city || '';
            const jobLocation = job.postcode || '';
            
            console.log(`Checking tradesperson ${tradesperson.first_name} ${tradesperson.last_name} in ${tradespersonLocation} for job in ${jobLocation}`);
            
            // Simple location matching - check if postcodes are similar
            const tradespersonPostcode = tradespersonLocation.toLowerCase().replace(/\s/g, '');
            const jobPostcode = jobLocation.toLowerCase().replace(/\s/g, '');
            
            // Match if postcodes are similar (same area) or if either is empty (broad match)
            const isLocationMatch = tradespersonPostcode.includes(jobPostcode.substring(0, 3)) ||
                                   jobPostcode.includes(tradespersonPostcode.substring(0, 3)) ||
                                   tradespersonPostcode === jobPostcode ||
                                   tradespersonPostcode === '' ||
                                   jobPostcode === '';
            
            console.log(`Location match for ${tradesperson.first_name}: ${isLocationMatch}`);
            return isLocationMatch;
          }) || [];

          console.log(`Found ${matchingTradespeople.length} location-matching tradespeople`);

          if (matchingTradespeople && matchingTradespeople.length > 0) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'khamareclarke@gmail.com',
                pass: 'ovga hgzy rltc ifyh'
              }
            });

            // Send email to each matching tradesperson
            console.log(`Sending emails to ${matchingTradespeople.length} tradespeople`);
            for (const tradesperson of matchingTradespeople) {
              try {
                console.log(`Sending email to ${tradesperson.first_name} ${tradesperson.last_name} at ${tradesperson.email}`);
                const tradespersonEmail = {
                  from: 'My Approved <khamareclarke@gmail.com>',
                  to: tradesperson.email,
                  subject: `New ${job.trade} Job Available in ${job.postcode} - My Approved`,
                  html: `
                    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:8px;">
                      <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
                        <h1 style="margin:0;font-size:24px;">My Approved</h1>
                        <p style="margin:5px 0 0 0;opacity:0.9;">Professional Job Matching Platform</p>
                      </div>
                      
                      <div style="padding:20px;">
                        <h2 style="color:#2d3748;margin-top:0;">New Job Opportunity!</h2>
                        <p>Hello ${tradesperson.first_name} ${tradesperson.last_name},</p>
                        <p>A new <strong>${job.trade}</strong> job has been approved and is now available in your area.</p>
                        
                        <div style="background-color:#f7fafc;padding:16px;border-radius:8px;margin:16px 0;border-left:4px solid #4299e1;">
                          <h3 style="margin-top:0;color:#2d3748;">Job Details:</h3>
                          <p><strong>Trade:</strong> ${job.trade}</p>
                          <p><strong>Description:</strong> ${job.job_description}</p>
                          <p><strong>Location:</strong> ${job.postcode}</p>
                          <p><strong>Budget:</strong> £${job.budget || 'Not specified'} (${job.budget_type || 'fixed'})</p>
                          <p><strong>Preferred Date:</strong> ${job.preferred_date || 'Not specified'}</p>
                        </div>
                        
                        <div style="text-align:center;margin:20px 0;">
                          <a href="http://localhost:3000/dashboard/tradesperson" 
                             style="background-color:#4299e1;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  `
                };
                const result = await transporter.sendMail(tradespersonEmail);
                console.log(`✅ Job notification sent successfully to ${tradesperson.email}. Message ID: ${result.messageId}`);
              } catch (emailError) {
                console.error(`❌ Failed to send email to ${tradesperson.email}:`, emailError);
              }
            }
            console.log(`📧 Email sending process completed for ${matchingTradespeople.length} tradespeople`);
          } else {
            console.log('⚠️ No matching tradespeople found for this job');
          }
        } else if (action === 'reject') {
          // Send rejection email to client
          if (client) {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'khamareclarke@gmail.com',
                pass: 'ovga hgzy rltc ifyh'
              }
            });

            const rejectionEmail = {
              from: 'My Approved <khamareclarke@gmail.com>',
              to: client.email,
              subject: 'Job Posting Update - My Approved',
              html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:8px;">
                  <h2 style="color:#2d3748;">Job Posting Update</h2>
                  <p>Hello ${client.first_name} ${client.last_name},</p>
                  <p>We're writing to inform you that your job posting has been reviewed by our admin team.</p>
                  
                  <div style="background-color:#fff5f5;padding:16px;border-radius:8px;margin:16px 0;border-left:4px solid #f56565;">
                    <h4 style="margin-top:0;color:#c53030;">Job Status: Not Approved</h4>
                    <p style="margin:0;color:#c53030;">
                      Your job posting did not meet our approval criteria. Please review the job details and consider reposting with more specific information.
                    </p>
                  </div>
                  
                  <p style="color:#666;font-size:14px;">
                    If you have any questions, please contact our support team.
                  </p>
                </div>
              `
            };

            await transporter.sendMail(rejectionEmail);
            console.log('Job rejection email sent to:', client.email);
          }
        }
      } catch (emailError) {
        console.error('Error sending approval emails:', emailError);
      }
    }, 100);

    return NextResponse.json({
      success: true,
      data: {
        jobId: job.id,
        status: job.status,
        isApproved: job.is_approved,
        message: `Job ${action}d successfully`
      },
      message: `Job ${action}d successfully`
    });

  } catch (error) {
    console.error('Job approval error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process job approval'
    }, { status: 500 });
  }
}

