import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase project
const supabase = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debugging tradespeople in database...');

    // Get all tradespeople regardless of verification status
    const { data: allTradespeople, error: allError } = await supabase
      .from('tradespeople')
      .select('id, first_name, last_name, email, trade, postcode, city, is_verified, is_approved')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('Error fetching all tradespeople:', allError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch tradespeople',
        details: allError.message
      }, { status: 500 });
    }

    console.log(`📊 Total tradespeople in database: ${allTradespeople?.length || 0}`);

    // Get only verified tradespeople
    const { data: verifiedTradespeople, error: verifiedError } = await supabase
      .from('tradespeople')
      .select('id, first_name, last_name, email, trade, postcode, city, is_verified, is_approved')
      .eq('is_verified', true);

    if (verifiedError) {
      console.error('Error fetching verified tradespeople:', verifiedError);
    } else {
      console.log(`✅ Verified tradespeople: ${verifiedTradespeople?.length || 0}`);
    }

    // Get unique trades
    const uniqueTrades = [...new Set(allTradespeople?.map(t => t.trade) || [])];
    console.log(`🔧 Unique trades in database: ${uniqueTrades.join(', ')}`);

    // Check for "Electrical" vs "Electrician"
    const electricalTradespeople = allTradespeople?.filter(t => 
      t.trade?.toLowerCase().includes('electrical') || 
      t.trade?.toLowerCase().includes('electrician')
    ) || [];

    console.log(`⚡ Tradespeople with electrical-related trade: ${electricalTradespeople.length}`);

    return NextResponse.json({
      success: true,
      data: {
        totalTradespeople: allTradespeople?.length || 0,
        verifiedTradespeople: verifiedTradespeople?.length || 0,
        uniqueTrades,
        electricalTradespeople: electricalTradespeople.map(t => ({
          name: `${t.first_name} ${t.last_name}`,
          email: t.email,
          trade: t.trade,
          location: t.postcode || t.city || 'Not specified',
          isVerified: t.is_verified,
          isApproved: t.is_approved
        })),
        allTradespeople: allTradespeople?.map(t => ({
          name: `${t.first_name} ${t.last_name}`,
          email: t.email,
          trade: t.trade,
          location: t.postcode || t.city || 'Not specified',
          isVerified: t.is_verified,
          isApproved: t.is_approved
        })) || []
      },
      message: 'Tradespeople database analysis completed'
    });

  } catch (error) {
    console.error('Debug tradespeople error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to debug tradespeople'
    }, { status: 500 });
  }
}
