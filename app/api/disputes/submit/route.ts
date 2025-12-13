import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function POST(request: NextRequest) {
  try {
    const { userId, userType, disputeDetails, userEmail, userPhone, fullMessage } = await request.json();

    if (!userId || !userType || !disputeDetails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create dispute ticket
    const { data: ticket, error } = await supabaseAdmin
      .from('support_tickets')
      .insert({
        user_id: userId,
        user_type: userType,
        chat_room_id: '00000000-0000-0000-0000-000000000001',
        original_message: disputeDetails,
        ai_response: `Contact: ${userEmail} | ${userPhone}\nDispute: ${disputeDetails}`,
        category: 'dispute',
        priority: 'high',
        status: 'open'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating dispute ticket:', error);
      return NextResponse.json({ error: 'Failed to create dispute ticket' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      ticket,
      ticketId: ticket.id
    });

  } catch (error) {
    console.error('Error in dispute submission API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
