import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get Square credentials from environment
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    const environment = process.env.SQUARE_ENVIRONMENT || 'sandbox';
    
    if (!accessToken || !locationId) {
      return NextResponse.json({
        error: 'Square credentials are missing',
        envCheck: {
          accessTokenExists: !!accessToken,
          locationIdExists: !!locationId
        }
      }, { status: 400 });
    }
    
    // Set the base URL based on environment
    const baseUrl = environment === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com';
    
    console.log(`Testing Square payment link creation in ${environment} environment`);
    
    // Create a simple test payment link
    const response = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Square-Version': '2023-05-17',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idempotency_key: `test-${Date.now()}`,
        quick_pay: {
          name: 'Test Payment',
          price_money: {
            amount: 100, // $1.00
            currency: 'USD'
          },
          location_id: locationId
        },
        checkout_options: {
          redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing/success`,
          ask_for_shipping_address: false
        }
      })
    });
    
    // Process the response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Square payment link creation error:', errorData);
      
      return NextResponse.json({
        success: false,
        error: 'Failed to create Square payment link',
        details: errorData,
        requestInfo: {
          url: `${baseUrl}/v2/online-checkout/payment-links`,
          locationId: locationId,
          environment
        }
      }, { status: 500 });
    }
    
    // Success! Return the payment link details
    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Successfully created Square payment link',
      paymentLink: data.payment_link.url,
      paymentLinkId: data.payment_link.id,
      fullResponse: data // Include the full response for debugging
    });
    
  } catch (error) {
    console.error('Error testing Square payment link:', error);
    return NextResponse.json({
      error: 'Failed to test Square payment link',
      details: error.message
    }, { status: 500 });
  }
} 