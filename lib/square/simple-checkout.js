/**
 * Simplified Square checkout function using fetch API directly
 * This avoids issues with the Square SDK import
 */

export async function createSquareCheckout(cartItems, customerInfo, config) {
  // Validate config
  if (!config.accessToken || !config.locationId) {
    throw new Error('Square credentials are missing');
  }

  // Calculate total amount in cents
  const totalAmountCents = Math.round(
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100
  );

  // Generate idempotency key (prevents duplicate charges)
  const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Format line items for display in Square receipt
  const lineItems = cartItems.map(item => ({
    name: item.name,
    quantity: String(item.quantity),
    basePriceMoney: {
      amount: Math.round(item.price * 100),
      currency: 'USD'
    },
    note: item.description || ''
  }));

  // Create order metadata
  const orderDetails = {
    items: cartItems.map(item => `${item.name} x${item.quantity}`).join(', '),
    customerEmail: customerInfo?.email || '',
    timestamp: new Date().toISOString()
  };

  try {
    // Use the proper URL based on environment (sandbox or production)
    const baseUrl = config.environment === 'production' 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';
      
    console.log(`Using Square ${config.environment} environment at ${baseUrl}`);
    
    // Create payment link directly using Square API
    const response = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Square-Version': '2023-05-17', 
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        quick_pay: {
          name: 'Dreamflow Design Services',
          price_money: {
            amount: totalAmountCents,
            currency: 'USD'
          },
          location_id: config.locationId
        },
        checkout_options: {
          redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing/success`,
          merchant_support_email: 'support@dreamflow.design',
          ask_for_shipping_address: false
        },
        pre_populated_data: {
          buyer_email: customerInfo?.email || ''
        },
        // Store order details in the payment link's note
        note: JSON.stringify(orderDetails)
      })
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('Square API error:', errorData);
        
        // Log more details to help debug permission issues
        if (errorData.errors && errorData.errors[0]?.category === 'AUTHENTICATION_ERROR') {
          console.error('Authentication error details:', {
            status: response.status,
            url: response.url,
            environment: config.environment,
            locationId: config.locationId.substring(0, 5) + '...' // Partial log for security
          });
        }
        
      } catch (e) {
        console.error('Error parsing error response:', e);
        errorData = { errors: [{ detail: `HTTP error ${response.status}` }] };
      }
      
      throw new Error(errorData.errors?.[0]?.detail || 'Failed to create Square payment link');
    }

    // Parse the successful response
    const data = await response.json();
    console.log('Square payment link created successfully');
    return {
      checkoutUrl: data.payment_link.url,
      paymentLinkId: data.payment_link.id,
      orderId: data.payment_link.order_id
    };
  } catch (error) {
    console.error('Error creating Square checkout:', error);
    throw error;
  }
} 