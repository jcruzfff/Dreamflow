import { squareConfig } from './config';

// Lazy initialization to prevent build-time errors
let squareClient = null;

async function initializeSquareClient() {
  if (squareClient) {
    return squareClient;
  }

  try {
    // Only initialize if we have the required credentials
    if (!squareConfig.accessToken || !squareConfig.locationId) {
      console.warn('Square credentials not available, client not initialized');
      return null;
    }

    // Dynamic import to prevent build-time issues
    const { Client } = await import('square');
    
    console.log('Square client initialization with environment:', squareConfig.environment);
    console.log('Square credentials available:', {
      accessTokenExists: !!squareConfig.accessToken,
      applicationIdExists: !!squareConfig.applicationId,
      locationIdExists: !!squareConfig.locationId
    });

    squareClient = new Client({
      accessToken: squareConfig.accessToken,
      environment: squareConfig.environment === 'production' 
        ? 'production' 
        : 'sandbox'
    });

    return squareClient;
  } catch (error) {
    console.error('Failed to initialize Square client:', error);
    return null;
  }
}

// Export a getter function instead of the client directly
export async function getSquareClient() {
  return await initializeSquareClient();
}

// Create helper functions for common Square operations
export async function createPayment(orderData) {
  try {
    const client = await getSquareClient();
    if (!client) {
      throw new Error('Square client not available');
    }

    const { orderId, customerId, sourceId, amount, currency = 'USD', note = '' } = orderData;
    
    console.log('Creating payment with:', {
      sourceId: sourceId ? 'Present' : 'Missing',
      amount,
      currency,
      orderId: orderId ? 'Present' : 'Missing',
      customerId: customerId ? 'Present' : 'Missing'
    });
    
    const response = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: amount,  // Amount in cents
        currency
      },
      orderId,
      customerId,
      note
    });

    return response.result;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

export async function createOrder(orderItems, customerId) {
  try {
    const client = await getSquareClient();
    if (!client) {
      throw new Error('Square client not available');
    }

    console.log('Creating order with locationId:', squareConfig.locationId);
    console.log('Order items count:', orderItems.length);
    
    const lineItems = orderItems.map(item => ({
      name: item.name,
      quantity: String(item.quantity),
      basePriceMoney: {
        amount: item.price * 100, // Convert dollars to cents
        currency: 'USD'
      },
      note: item.description || ''
    }));
    
    console.log('Line items prepared:', lineItems.length);
    
    const response = await client.ordersApi.createOrder({
      order: {
        locationId: squareConfig.locationId,
        customerId,
        lineItems: lineItems
      },
      idempotencyKey: Date.now().toString()
    });

    console.log('Order created successfully:', !!response.result);
    return response.result;
  } catch (error) {
    console.error('Error creating order:', error);
    // Log specific Square API errors
    if (error.errors) {
      console.error('Square API errors:', JSON.stringify(error.errors));
    }
    throw error;
  }
}

export async function createCustomer(customerData) {
  try {
    const client = await getSquareClient();
    if (!client) {
      throw new Error('Square client not available');
    }

    const { email, givenName, familyName } = customerData;
    
    console.log('Creating customer with email:', email ? 'Present' : 'Missing');
    
    const response = await client.customersApi.createCustomer({
      emailAddress: email,
      givenName,
      familyName
    });

    return response.result;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
} 