import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

// GET dispute tickets ONLY for admin dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('support_tickets')
      .select(`
        *,
        chat_rooms (
          id,
          job_id,
          created_at,
          jobs (
            trade,
            job_description,
            postcode
          ),
          clients (
            first_name,
            last_name,
            email
          ),
          tradespeople (
            first_name,
            last_name,
            email,
            trade
          )
        )
      `)
      .eq('category', 'dispute') // ONLY dispute tickets
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: tickets, error } = await query;

    if (error) {
      console.error('Error fetching dispute tickets:', error);
      return NextResponse.json({ error: 'Failed to fetch dispute tickets' }, { status: 500 });
    }

    // Get total count for pagination (disputes only)
    let countQuery = supabaseAdmin
      .from('support_tickets')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'dispute');

    if (status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }

    const { count } = await countQuery;

    // Transform data to include user info
    const disputesWithUserInfo = tickets?.map((ticket: any) => ({
      ...ticket,
      user_name: ticket.user_type === 'client' 
        ? (ticket.chat_rooms?.clients ? `${ticket.chat_rooms.clients.first_name || ''} ${ticket.chat_rooms.clients.last_name || ''}`.trim() || 'Unknown' : 'Unknown')
        : (ticket.chat_rooms?.tradespeople ? `${ticket.chat_rooms.tradespeople.first_name || ''} ${ticket.chat_rooms.tradespeople.last_name || ''}`.trim() || 'Unknown' : 'Unknown'),
      user_email: ticket.user_type === 'client' 
        ? ticket.chat_rooms?.clients?.email || 'Unknown'
        : ticket.chat_rooms?.tradespeople?.email || 'Unknown',
      job_info: ticket.chat_rooms?.jobs ? {
        trade: ticket.chat_rooms.jobs.trade,
        description: ticket.chat_rooms.jobs.job_description,
        postcode: ticket.chat_rooms.jobs.postcode
      } : null
    })) || [];

    return NextResponse.json({
      success: true,
      data: {
        disputes: disputesWithUserInfo,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error in disputes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST update dispute ticket
export async function POST(request: NextRequest) {
  try {
    const { ticketId, status, assignedTo, adminNotes, resolutionNotes } = await request.json();

    if (!ticketId) {
      return NextResponse.json({ error: 'Missing ticket ID' }, { status: 400 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };
    
    if (status) updateData.status = status;
    if (assignedTo) updateData.assigned_to = assignedTo;
    if (adminNotes) updateData.admin_notes = adminNotes;
    if (resolutionNotes) updateData.resolution_notes = resolutionNotes;

    const { data: ticket, error } = await supabaseAdmin
      .from('support_tickets')
      .update(updateData)
      .eq('id', ticketId)
      .eq('category', 'dispute') // Ensure we only update dispute tickets
      .select()
      .single();

    if (error) {
      console.error('Error updating dispute ticket:', error);
      return NextResponse.json({ error: 'Failed to update dispute ticket' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      ticket
    });

  } catch (error) {
    console.error('Error in dispute ticket update API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

