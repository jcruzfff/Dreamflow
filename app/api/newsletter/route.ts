import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Beehiiv API integration
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const beehiivPublicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!beehiivApiKey || !beehiivPublicationId) {
      console.error('Beehiiv credentials not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Subscribe to Beehiiv
    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${beehiivApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'visioneer_newsletter_page',
          utm_medium: 'email_signup',
          referring_site: 'dreamflowlabs.com'
        }),
      }
    );

    if (!beehiivResponse.ok) {
      const errorData = await beehiivResponse.text();
      console.error('Beehiiv API error:', errorData);
      
      // Check if it's a duplicate email error (which is actually success)
      if (beehiivResponse.status === 400 && errorData.includes('already exists')) {
        return NextResponse.json({ 
          success: true, 
          message: 'Successfully subscribed!' 
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }

    const result = await beehiivResponse.json();
    console.log('Beehiiv subscription successful:', result);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to The Visioneer!' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 