import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase project
const supabase = createClient(
  'https://jismdkfjkngwbpddhomx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A'
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trade = searchParams.get('trade') || 'Electrician';
    const postcode = searchParams.get('postcode') || 'SW1A 1AA';

    console.log(`Testing tradespeople matching for trade: ${trade}, postcode: ${postcode}`);

    // Get all tradespeople with matching trade
    const { data: allTradespeople, error: tradespeopleError } = await supabase
      .from('tradespeople')
      .select('id, first_name, last_name, email, trade, postcode, city, is_verified')
      .eq('trade', trade)
      .eq('is_verified', true);

    if (tradespeopleError) {
      console.error('Error fetching tradespeople:', tradespeopleError);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch tradespeople',
        details: tradespeopleError.message
      }, { status: 500 });
    }

    console.log(`Found ${allTradespeople?.length || 0} tradespeople with trade: ${trade}`);

    // Filter by location
    const matchingTradespeople = allTradespeople?.filter(tradesperson => {
      const tradespersonLocation = tradesperson.postcode || tradesperson.city || '';
      const jobLocation = postcode || '';
      
      console.log(`Checking ${tradesperson.first_name} ${tradesperson.last_name} in ${tradespersonLocation} for job in ${jobLocation}`);
      
      // Simple location matching
      const tradespersonPostcode = tradespersonLocation.toLowerCase().replace(/\s/g, '');
      const jobPostcode = jobLocation.toLowerCase().replace(/\s/g, '');
      
      const isLocationMatch = tradespersonPostcode.includes(jobPostcode.substring(0, 3)) ||
                             jobPostcode.includes(tradespersonPostcode.substring(0, 3)) ||
                             tradespersonPostcode === jobPostcode ||
                             tradespersonPostcode === '' ||
                             jobPostcode === '';
      
      console.log(`Location match: ${isLocationMatch}`);
      return isLocationMatch;
    }) || [];

    return NextResponse.json({
      success: true,
      data: {
        trade,
        postcode,
        totalTradespeople: allTradespeople?.length || 0,
        matchingTradespeople: matchingTradespeople.length,
        tradespeople: matchingTradespeople.map(t => ({
          name: `${t.first_name} ${t.last_name}`,
          email: t.email,
          location: t.postcode || t.city || 'Not specified',
          trade: t.trade
        }))
      },
      message: `Found ${matchingTradespeople.length} matching tradespeople`
    });

  } catch (error) {
    console.error('Test tradespeople matching error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to test tradespeople matching'
    }, { status: 500 });
  }
}
