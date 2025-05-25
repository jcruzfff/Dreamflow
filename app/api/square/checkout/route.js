import { NextResponse } from 'next/server';
import { createSquareCheckout } from '../../../../lib/square/simple-checkout';

export async function POST(request) {
  try {
    console.log('=== Square checkout API route called ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Timestamp:', new Date().toISOString());
    
    const body = await request.json();
    const { cartItems, customerInfo } = body;
    
    console.log('Received request body:', JSON.stringify({
      itemCount: cartItems?.length,
      customerInfo: customerInfo ? 'Present' : 'Not provided',
      cartItemsPreview: cartItems?.slice(0, 2).map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }));
    
    if (!cartItems || !cartItems.length) {
      console.error('No items in cart - returning 400');
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }
    
    // Square configuration from environment variables
    const squareConfig = {
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      locationId: process.env.SQUARE_LOCATION_ID,
      // Auto-detect environment: use production if NODE_ENV is production, unless explicitly overridden
      environment: process.env.SQUARE_ENVIRONMENT || (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox')
    };
    
    // Enhanced credential checking with detailed logging
    console.log('Square configuration check:', {
      accessTokenExists: !!squareConfig.accessToken,
      accessTokenLength: squareConfig.accessToken?.length || 0,
      accessTokenPrefix: squareConfig.accessToken?.substring(0, 10) + '...',
      locationIdExists: !!squareConfig.locationId,
      locationId: squareConfig.locationId,
      environment: squareConfig.environment,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    });
    
    // Check if Square credentials are available
    if (!squareConfig.accessToken || !squareConfig.locationId) {
      console.error('Square credentials missing:', {
        accessTokenExists: !!squareConfig.accessToken,
        locationIdExists: !!squareConfig.locationId,
        allEnvVars: Object.keys(process.env).filter(key => key.includes('SQUARE'))
      });
      return NextResponse.json({ 
        error: 'Square configuration missing. Please check environment variables.',
        debug: {
          accessTokenExists: !!squareConfig.accessToken,
          locationIdExists: !!squareConfig.locationId,
          environment: squareConfig.environment
        }
      }, { status: 500 });
    }
    
    console.log('Calling createSquareCheckout...');
    
    // Create Square checkout session
    const checkoutData = await createSquareCheckout(cartItems, customerInfo, squareConfig);
    
    console.log('Square checkout created successfully:', {
      hasCheckoutUrl: !!checkoutData.checkoutUrl,
      hasPaymentLinkId: !!checkoutData.paymentLinkId,
      urlLength: checkoutData.checkoutUrl?.length || 0
    });
    
    return NextResponse.json({ 
      checkoutUrl: checkoutData.checkoutUrl,
      paymentLinkId: checkoutData.paymentLinkId
    });

  } catch (error) {
    console.error('=== ERROR in Square checkout ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Log additional error details if available
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    
    if (error.cause) {
      console.error('Error cause:', error.cause);
    }
    
    // Check if it's a network error
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    return NextResponse.json({ 
      error: 'Error processing payment', 
      details: error.message,
      errorType: error.name,
      timestamp: new Date().toISOString(),
      // Only include stack trace in development
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      // Include additional debug info in development
      debug: process.env.NODE_ENV === 'development' ? {
        errorCode: error.code,
        errorCause: error.cause,
        hasResponse: !!error.response
      } : undefined
    }, { status: 500 });
  }
} 