import { NextResponse } from 'next/server';

// Form data type
type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  timeline: string;
  services: string[];
  projectDetails: string;
  referral: string;
};

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();
    
    // Validate the required fields
    if (!data.name || !data.email || !data.company || !data.services.length || !data.budget || !data.timeline || !data.projectDetails) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Construct the Asana task
    const asanaData = {
      data: {
        name: `New Project Inquiry: ${data.company}`,
        notes: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Website: ${data.website || 'Not provided'}

Budget: ${data.budget}
Timeline: ${data.timeline}
Services: ${data.services.join(', ')}

Project Details:
${data.projectDetails}

Referral Source: ${data.referral || 'Not provided'}
        `,
        projects: [process.env.ASANA_PROJECT_ID], // Project to add the task to
      },
    };

    // Submit to Asana if API key is available
    if (process.env.ASANA_API_KEY && process.env.ASANA_PROJECT_ID) {
      const asanaResponse = await fetch(
        `https://app.asana.com/api/1.0/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ASANA_API_KEY}`,
          },
          body: JSON.stringify(asanaData),
        }
      );

      const asanaResult = await asanaResponse.json();
      
      if (!asanaResponse.ok) {
        console.error('Asana API error:', asanaResult);
        return NextResponse.json(
          { message: 'Error creating Asana task' },
          { status: 500 }
        );
      }

      // Send email notification
      // This is where you would integrate with an email service
      // like SendGrid, Mailchimp, etc.

      return NextResponse.json({
        message: 'Form submitted successfully',
        taskId: asanaResult.data.gid
      });
    } else {
      // For development purposes, just log the data
      console.log('Form submission (dev mode):', data);
      return NextResponse.json({
        message: 'Form submitted successfully (dev mode)',
        data: data
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
} 