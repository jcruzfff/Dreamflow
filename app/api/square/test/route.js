import { NextResponse } from 'next/server';
import { squareClient } from '../../../../lib/square/client';
import { squareConfig } from '../../../../lib/square/config';

export async function GET() {
  try {
    // Check if environment variables are set
    const envCheck = {
      accessTokenExists: !!process.env.SQUARE_ACCESS_TOKEN,
      appIdExists: !!process.env.SQUARE_APP_ID,
      locationIdExists: !!process.env.SQUARE_LOCATION_ID,
      environment: process.env.SQUARE_ENVIRONMENT || 'not set',
    };
    
    console.log('Square config env check:', envCheck);
    
    // Check if the config values are accessible
    const configCheck = {
      accessTokenExists: !!squareConfig.accessToken,
      applicationIdExists: !!squareConfig.applicationId,
      locationIdExists: !!squareConfig.locationId,
      environment: squareConfig.environment,
    };
    
    // Test a simple Square API call if credentials exist
    let apiTest = { success: false, message: 'Not attempted - credentials missing' };
    
    if (squareConfig.accessToken && squareConfig.locationId) {
      try {
        // Just retrieve location info as a simple test
        const response = await squareClient.locationsApi.retrieveLocation(squareConfig.locationId);
        apiTest = {
          success: true,
          message: 'Successfully connected to Square API',
          locationName: response.result.location.name
        };
      } catch (apiError) {
        apiTest = {
          success: false,
          message: 'Failed to connect to Square API',
          error: apiError.message
        };
      }
    }
    
    return NextResponse.json({
      status: 'Square API Test',
      envCheck,
      configCheck,
      apiTest
    });
    
  } catch (error) {
    console.error('Error testing Square configuration:', error);
    return NextResponse.json({
      error: 'Failed to test Square configuration',
      details: error.message
    }, { status: 500 });
  }
} 