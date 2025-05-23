import { Client } from 'square';
import { squareConfig } from './config';

// Initialize Square client with your credentials
console.log('Square client initialization with environment:', squareConfig.environment);
console.log('Square credentials available:', {
  accessTokenExists: !!squareConfig.accessToken,
  applicationIdExists: !!squareConfig.applicationId,
  locationIdExists: !!squareConfig.locationId
});

// In newer Square SDK versions, environment is a simple string
export const squareClient = new Client({
  accessToken: squareConfig.accessToken,
  environment: squareConfig.environment === 'production' 
    ? 'production' 
    : 'sandbox'
});

// Create helper functions for common Square operations
export async function createPayment(orderData) {
  try {
    const { orderId, customerId, sourceId, amount, currency = 'USD', note = '' } = orderData;
    
    console.log('Creating payment with:', {
      sourceId: sourceId ? 'Present' : 'Missing',
      amount,
      currency,
      orderId: orderId ? 'Present' : 'Missing',
      customerId: customerId ? 'Present' : 'Missing'
    });
    
    const response = await squareClient.paymentsApi.createPayment({
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
    
    const response = await squareClient.ordersApi.createOrder({
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
    const { email, givenName, familyName } = customerData;
    
    console.log('Creating customer with email:', email ? 'Present' : 'Missing');
    
    const response = await squareClient.customersApi.createCustomer({
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