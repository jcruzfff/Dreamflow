/**
 * Simplified Square checkout function using fetch API directly
 * This avoids issues with the Square SDK import
 */

export async function createSquareCheckout(cartItems, customerInfo, config) {
  console.log('=== createSquareCheckout called ===');
  
  // Validate config
  if (!config.accessToken || !config.locationId) {
    console.error('Square credentials validation failed:', {
      hasAccessToken: !!config.accessToken,
      hasLocationId: !!config.locationId,
      environment: config.environment
    });
    throw new Error('Square credentials are missing');
  }

  // Generate idempotency key (prevents duplicate charges)
  const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  console.log('Generated idempotency key:', idempotencyKey);

  // Format line items for Square order
  const lineItems = cartItems.map(item => {
    // Create a more detailed description including options
    let itemNote = item.description || '';
    if (item.options?.selectedVariant && item.options.selectedVariant !== 'Standard') {
      itemNote += ` (${item.options.selectedVariant})`;
    }
    
    // Add any project types if available
    if (item.options?.projectTypes && Array.isArray(item.options.projectTypes)) {
      itemNote += ` - ${item.options.projectTypes.join(', ')}`;
    }
    
    return {
      name: item.name,
      quantity: String(item.quantity),
      base_price_money: {
        amount: Math.round(item.price * 100), // Convert to cents
        currency: 'USD'
      },
      note: itemNote,
      // Add variation name to help identify the item
      variation_name: item.options?.selectedVariant || 'Standard'
    };
  });

  console.log('Formatted line items:', lineItems.length, 'items');
  console.log('Line items preview:', lineItems.slice(0, 2));

  // Create order metadata for additional context
  const orderMetadata = {
    customer_email: customerInfo?.email || '',
    order_timestamp: new Date().toISOString(),
    item_count: String(cartItems.length),
    total_items: String(cartItems.reduce((sum, item) => sum + item.quantity, 0))
  };

  console.log('Order metadata:', orderMetadata);

  try {
    // Use the proper URL based on environment (sandbox or production)
    const baseUrl = config.environment === 'production' 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';
      
    console.log(`Using Square ${config.environment} environment at ${baseUrl}`);
    
    const apiUrl = `${baseUrl}/v2/online-checkout/payment-links`;
    console.log('API URL:', apiUrl);
    
    const requestBody = {
      idempotency_key: idempotencyKey,
      order: {
        location_id: config.locationId,
        line_items: lineItems,
        metadata: orderMetadata
      },
      checkout_options: {
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing/success`,
        merchant_support_email: 'support@dreamflow.design',
        ask_for_shipping_address: false,
        enable_coupon: false,
        enable_loyalty: false
      },
      pre_populated_data: {
        buyer_email: customerInfo?.email || ''
      },
      description: `Dreamflow Design Services - ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`
    };
    
    console.log('Request body structure:', {
      hasIdempotencyKey: !!requestBody.idempotency_key,
      orderLocationId: requestBody.order.location_id,
      lineItemsCount: requestBody.order.line_items.length,
      redirectUrl: requestBody.checkout_options.redirect_url,
      buyerEmail: requestBody.pre_populated_data.buyer_email
    });
    
    // Create payment link directly with order structure
    console.log('Making Square API request...');
    const paymentLinkResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Square-Version': '2023-05-17',
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Square API response status:', paymentLinkResponse.status);
    console.log('Square API response headers:', Object.fromEntries(paymentLinkResponse.headers.entries()));

    if (!paymentLinkResponse.ok) {
      let linkErrorData;
      const responseText = await paymentLinkResponse.text();
      console.error('Square API error response text:', responseText);
      
      try {
        linkErrorData = JSON.parse(responseText);
        console.error('Square Payment Link API error (parsed):', linkErrorData);
      } catch (e) {
        console.error('Error parsing payment link error response:', e);
        linkErrorData = { 
          errors: [{ 
            detail: `HTTP error ${paymentLinkResponse.status}: ${responseText}` 
          }] 
        };
      }
      
      const errorMessage = linkErrorData.errors?.[0]?.detail || `Failed to create Square payment link (${paymentLinkResponse.status})`;
      console.error('Throwing error:', errorMessage);
      throw new Error(errorMessage);
    }

    // Parse the successful response
    const responseText = await paymentLinkResponse.text();
    console.log('Square API success response length:', responseText.length);
    
    let linkData;
    try {
      linkData = JSON.parse(responseText);
      console.log('Square payment link created successfully');
      console.log('Response structure:', {
        hasPaymentLink: !!linkData.payment_link,
        hasUrl: !!linkData.payment_link?.url,
        hasId: !!linkData.payment_link?.id,
        hasOrderId: !!linkData.payment_link?.order_id
      });
    } catch (e) {
      console.error('Error parsing successful response:', e);
      console.error('Response text:', responseText);
      throw new Error('Invalid response format from Square API');
    }
    
    return {
      checkoutUrl: linkData.payment_link.url,
      paymentLinkId: linkData.payment_link.id,
      orderId: linkData.payment_link.order_id
    };
    
  } catch (error) {
    console.error('=== Error in createSquareCheckout ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Log network-specific errors
    if (error.cause) {
      console.error('Error cause:', error.cause);
    }
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    // Check if it's a fetch error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network/fetch error detected');
    }
    
    throw error;
  }
} 