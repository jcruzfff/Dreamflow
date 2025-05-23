import { NextResponse } from 'next/server';
import { createSquareCheckout } from '../../../../lib/square/simple-checkout';

export async function POST(request) {
  try {
    console.log('Square checkout API route called');
    
    const body = await request.json();
    const { cartItems, customerInfo } = body;
    
    console.log('Received request body:', JSON.stringify({
      itemCount: cartItems?.length,
      customerInfo: customerInfo ? 'Present' : 'Not provided'
    }));
    
    if (!cartItems || !cartItems.length) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }
    
    // Square configuration from environment variables
    const squareConfig = {
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      locationId: process.env.SQUARE_LOCATION_ID,
      environment: process.env.SQUARE_ENVIRONMENT || 'sandbox'
    };
    
    // Check if Square credentials are available
    if (!squareConfig.accessToken || !squareConfig.locationId) {
      console.error('Square credentials missing:', {
        accessTokenExists: !!squareConfig.accessToken,
        locationIdExists: !!squareConfig.locationId
      });
      return NextResponse.json({ 
        error: 'Square configuration missing. Please check environment variables.' 
      }, { status: 500 });
    }
    
    // Create Square checkout session
    const checkoutData = await createSquareCheckout(cartItems, customerInfo, squareConfig);
    
    return NextResponse.json({ 
      checkoutUrl: checkoutData.checkoutUrl,
      paymentLinkId: checkoutData.paymentLinkId
    });

  } catch (error) {
    console.error('Error in Square checkout:', error);
    // Log the full error detail for debugging
    console.error('Full error:', error);
    
    return NextResponse.json({ 
      error: 'Error processing payment', 
      details: error.message,
      errorType: error.name,
      errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
} 