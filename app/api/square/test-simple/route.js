import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are set
    const envCheck = {
      accessTokenExists: !!process.env.SQUARE_ACCESS_TOKEN,
      appIdExists: !!process.env.SQUARE_APP_ID, 
      locationIdExists: !!process.env.SQUARE_LOCATION_ID,
      environment: process.env.SQUARE_ENVIRONMENT || 'not set',
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'not set'
    };
    
    console.log('Square environment variables check:', envCheck);
    
    // Test a simple Square API call - list locations
    let apiTest = { success: false, message: 'Not attempted - credentials missing' };
    
    if (envCheck.accessTokenExists) {
      try {
        // Try listing locations as a simple test
        const response = await fetch('https://connect.squareupsandbox.com/v2/locations', {
          method: 'GET',
          headers: {
            'Square-Version': '2023-05-17',
            'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          apiTest = {
            success: true,
            message: 'Successfully connected to Square API',
            locationCount: data.locations?.length || 0,
            locations: data.locations?.map(location => ({
              id: location.id,
              name: location.name
            })) || []
          };
        } else {
          const errorData = await response.json();
          apiTest = {
            success: false,
            message: 'Failed to connect to Square API',
            error: errorData.errors?.[0]?.detail || 'Unknown error'
          };
        }
      } catch (apiError) {
        apiTest = {
          success: false,
          message: 'Failed to connect to Square API',
          error: apiError.message
        };
      }
    }
    
    return NextResponse.json({
      status: 'Square API Simple Test',
      envCheck,
      apiTest,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error testing Square configuration:', error);
    return NextResponse.json({
      error: 'Failed to test Square configuration',
      details: error.message
    }, { status: 500 });
  }
} 