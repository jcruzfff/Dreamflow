import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Environment variable validation
const validateEnv = () => {
  if (!process.env.ASANA_ACCESS_TOKEN) {
    console.error('Missing ASANA_ACCESS_TOKEN environment variable');
    return false;
  }
  if (!process.env.PROJECT_ID) {
    console.error('Missing PROJECT_ID environment variable');
    return false;
  }
  return true;
};

// Email sending function
const sendNotificationEmail = async (data: FormData) => {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email configuration missing, skipping notification email');
      return false;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const emailContent = `
      <h2>🎉 New Design Services Lead! 🎉</h2>
      <p>A new lead has submitted a request for design services through the website.</p>
      
      <h3>Lead Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Company:</strong> ${data.company}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Website:</strong> ${data.website || 'Not provided'}</li>
        <li><strong>Budget:</strong> ${data.budget}</li>
        <li><strong>Timeline:</strong> ${data.timeline}</li>
        <li><strong>Services:</strong> ${data.services.join(', ')}</li>
      </ul>
      
      <h3>Project Goals:</h3>
      <p>${data.goals}</p>
      
      <p>The lead has been automatically added to the Asana dashboard. Please login to Asana to respond to this lead.</p>
      
      <p><a href="https://app.asana.com/0/${process.env.PROJECT_ID}/list">View Asana Dashboard</a></p>
      
      <p>-- Dreamflow Labs Team</p>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: '"Dreamflow Labs" <no-reply@dreamflowlabs.com>',
      to: 'design@dreamflowlabs.com, hello@dreamflowlabs.com',
      subject: `New Lead: ${data.name} from ${data.company}`,
      html: emailContent,
    });

    console.log('Notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
};

// Form data type
type FormData = {
  name: string;
  email: string;
  company: string;
  website: string;
  goals: string;
  budget: string;
  timeline: string;
  services: string[];
  source: string;
};

// Timeline enum_option GIDs mapping
const timelineOptions: Record<string, string> = {
  'asap': '1208369425912600',
  '1-2-months': '1208393912239626',
  '3-6-months': '1208369425912634',
  'flexible': '1208393912239627'
};

// Budget enum_option GIDs mapping
const budgetOptions: Record<string, string> = {
  '2k-5k': '1208369425912638',
  '5k-10k': '1208369425912639',
  '10k-20k': '1208369425912640',
  '20k-50k': '1208369425912641',
  '50k-100k+': '1208369425912642'
};

// Source enum_option GIDs mapping
const sourceOptions: Record<string, string> = {
  'referral': '1208369425912646',
  'social-media': '1208369425912647',
  'google': '1208369425912648',
  'event': '1208369425912650',
  'other': '1208369425912651'
};

// Services checkbox GIDs mapping
const serviceOptions: Record<string, string> = {
  'brand-identity': '1208369425912593',
  'brand-strategy': '1208369425912597',
  'web-design': '1208393912239628',
  'ui-ux-design': '1208369425912594',
  'marketing-assets': '1208393912239629',
  'event-design': '1208393912239630',
  'development-services': '1208393912239631',
  'other-services': '1208393912239632'
};

export async function POST(request: Request) {
  try {
    // Check environment variables
    const isEnvValid = validateEnv();
    
    const data: FormData = await request.json();
    
    // Limit what gets logged to protect sensitive information
    if (process.env.NODE_ENV === 'production') {
      console.log('Form submission received from:', data.email);
    } else {
      // In development, log limited information 
      console.log('Form received from:', data.name, '(', data.email, ')');
      console.log('Services requested:', data.services.join(', '));
    }
    
    // Validate the required fields
    if (!data.name || !data.email || !data.company || !data.services.length || !data.budget || !data.timeline || !data.goals) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If environment variables are missing, still accept the form but notify the user
    if (!isEnvValid) {
      console.warn('Form processed but not sent to Asana due to missing configuration');
      return NextResponse.json({
        message: 'Form received successfully, but could not be forwarded to our task system.',
        success: true
      });
    }

    // Get the selected timeline, budget, source GID
    const selectedTimelineGID = timelineOptions[data.timeline];
    const selectedBudgetGID = budgetOptions[data.budget];
    const selectedSourceGID = sourceOptions[data.source];

    // Map selected services (checkboxes) to their respective GIDs
    const selectedServicesGIDs = data.services.map(service => serviceOptions[service]);

    // Construct the Asana task data
    const taskData = {
      data: {
        name: `New Client Submission: ${data.name}`,
        projects: [process.env.PROJECT_ID],
        notes: `Email: ${data.email}\nCompany: ${data.company}\nWebsite: ${data.website}\nGoals: ${data.goals}\nTimeline: ${data.timeline}\nBudget: ${data.budget}\nSource: ${data.source}`,
        custom_fields: {
          '1208369425912572': data.email,  // GID for Email
          '1208369425912570': data.name,   // GID for Name
          '1208369425912574': data.company,  // GID for Company
          '1208369425912576': data.website,  // GID for Website
          '1208369425912590': data.goals,  // GID for Goals
          '1208369425912599': selectedTimelineGID,  // Timeline GID
          '1208369425912637': selectedBudgetGID,  // Budget GID
          '1208369425912645': selectedSourceGID,  // Source GID
          '1208369425912592': selectedServicesGIDs  // Services GIDs array
        }
      }
    };

    // Submit to Asana if API key is available
    if (process.env.ASANA_ACCESS_TOKEN && process.env.PROJECT_ID) {
      // Don't log sensitive data in production
      if (process.env.NODE_ENV !== 'production') {
        console.log('Sending data to Asana for project:', process.env.PROJECT_ID);
      }
      
      const response = await fetch('https://app.asana.com/api/1.0/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ASANA_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error('Asana API error status:', response.status);
        return NextResponse.json(
          { message: 'Error creating Asana task' },
          { status: 500 }
        );
      }

      console.log('Asana task created successfully for:', data.email);
      
      // Send notification email
      await sendNotificationEmail(data);
      
      return NextResponse.json({
        message: 'Task successfully created in Asana',
        taskId: result.data?.gid
      });
    } else {
      // For development purposes, just log the data
      console.log('Form submission received, but ASANA_ACCESS_TOKEN or PROJECT_ID not set');
      
      // Send notification email even in development mode if email config is set
      await sendNotificationEmail(data);
      
      return NextResponse.json({
        message: 'Form submitted successfully (dev mode)',
        note: 'API keys not configured, task not created in Asana'
      });
    }
  } catch (error) {
    console.error('Error processing form submission:', (error as Error).message);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
} 