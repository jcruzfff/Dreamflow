/**
 * Simplified Square checkout function using fetch API directly
 * This avoids issues with the Square SDK import
 */

export async function createSquareCheckout(cartItems, customerInfo, config) {
  // Validate config
  if (!config.accessToken || !config.locationId) {
    throw new Error('Square credentials are missing');
  }

  // Generate idempotency key (prevents duplicate charges)
  const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

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

  // Create order metadata for additional context
  const orderMetadata = {
    customer_email: customerInfo?.email || '',
    order_timestamp: new Date().toISOString(),
    item_count: String(cartItems.length),
    total_items: String(cartItems.reduce((sum, item) => sum + item.quantity, 0))
  };

  try {
    // Use the proper URL based on environment (sandbox or production)
    const baseUrl = config.environment === 'production' 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';
      
    // Only log environment in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Using Square ${config.environment} environment at ${baseUrl}`);
    }
    
    // Create payment link directly with order structure
    console.log('Creating Square payment link with order...');
    const paymentLinkResponse = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Square-Version': '2023-05-17',
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      })
    });

    if (!paymentLinkResponse.ok) {
      let linkErrorData;
      try {
        linkErrorData = await paymentLinkResponse.json();
        console.error('Square Payment Link API error:', linkErrorData);
      } catch (e) {
        console.error('Error parsing payment link error response:', e);
        linkErrorData = { errors: [{ detail: `HTTP error ${paymentLinkResponse.status}` }] };
      }
      throw new Error(linkErrorData.errors?.[0]?.detail || 'Failed to create Square payment link');
    }

    // Parse the successful response
    const linkData = await paymentLinkResponse.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('Square payment link created successfully');
    }
    
    return {
      checkoutUrl: linkData.payment_link.url,
      paymentLinkId: linkData.payment_link.id,
      orderId: linkData.payment_link.order_id
    };
    
  } catch (error) {
    // Log errors but don't expose sensitive details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating Square checkout:', error);
    } else {
      console.error('Square checkout error:', error.message);
    }
    throw error;
  }
} 