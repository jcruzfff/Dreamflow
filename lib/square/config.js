// Square API configuration
// Replace these values with your actual Square credentials from .env.local

export const squareConfig = {
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  applicationId: process.env.SQUARE_APP_ID,
  locationId: process.env.SQUARE_LOCATION_ID,
  environment: process.env.SQUARE_ENVIRONMENT || 'sandbox'
}; 