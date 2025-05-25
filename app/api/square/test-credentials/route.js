import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== Square credentials test ===');
    
    // Check environment variables
    const squareConfig = {
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      locationId: process.env.SQUARE_LOCATION_ID,
      // Auto-detect environment: use production if NODE_ENV is production, unless explicitly overridden
      environment: process.env.SQUARE_ENVIRONMENT || (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'),
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    };
    
    console.log('Environment check:', {
      nodeEnv: process.env.NODE_ENV,
      hasAccessToken: !!squareConfig.accessToken,
      accessTokenLength: squareConfig.accessToken?.length || 0,
      accessTokenPrefix: squareConfig.accessToken?.substring(0, 15) + '...',
      hasLocationId: !!squareConfig.locationId,
      locationId: squareConfig.locationId,
      environment: squareConfig.environment,
      baseUrl: squareConfig.baseUrl,
      allSquareEnvVars: Object.keys(process.env).filter(key => key.includes('SQUARE'))
    });
    
    // Test basic Square API connectivity
    const baseUrl = squareConfig.environment === 'production' 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';
    
    if (!squareConfig.accessToken || !squareConfig.locationId) {
      return NextResponse.json({
        status: 'error',
        message: 'Square credentials missing',
        details: {
          hasAccessToken: !!squareConfig.accessToken,
          hasLocationId: !!squareConfig.locationId,
          environment: squareConfig.environment
        }
      }, { status: 400 });
    }
    
    // Test API connectivity with a simple locations request
    console.log('Testing Square API connectivity...');
    const testResponse = await fetch(`${baseUrl}/v2/locations`, {
      method: 'GET',
      headers: {
        'Square-Version': '2023-05-17',
        'Authorization': `Bearer ${squareConfig.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Square API test response status:', testResponse.status);
    
    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('Square API test failed:', errorText);
      
      return NextResponse.json({
        status: 'error',
        message: 'Square API authentication failed',
        details: {
          status: testResponse.status,
          error: errorText,
          environment: squareConfig.environment,
          apiUrl: `${baseUrl}/v2/locations`
        }
      }, { status: 500 });
    }
    
    const locationsData = await testResponse.json();
    console.log('Square API test successful, locations found:', locationsData.locations?.length || 0);
    
    // Check if the configured location ID exists
    const configuredLocation = locationsData.locations?.find(loc => loc.id === squareConfig.locationId);
    
    return NextResponse.json({
      status: 'success',
      message: 'Square credentials and API connectivity verified',
      details: {
        environment: squareConfig.environment,
        apiUrl: baseUrl,
        locationsFound: locationsData.locations?.length || 0,
        configuredLocationExists: !!configuredLocation,
        configuredLocationName: configuredLocation?.name || 'Not found',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error testing Square credentials:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Error testing Square credentials',
      details: {
        error: error.message,
        type: error.name,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 