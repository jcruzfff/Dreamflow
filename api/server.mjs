import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import pkg from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { json } = pkg;
const app = express();
const port = process.env.NODE_ENV === 'production' ? 443 : 3000;
const host = process.env.NODE_ENV === 'production' ? 'www.dreamflowlabs.com' : 'localhost';

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up body parsing and CORS
app.use(json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

if (!process.env.ASANA_ACCESS_TOKEN && !process.env.PROJECT_ID) {
    console.error('ASANA_ACCESS_TOKEN and PROJECT_ID must be set');
    process.exit(1);
}

const ASANA_ACCESS_TOKEN = process.env.ASANA_ACCESS_TOKEN;
const PROJECT_ID = process.env.PROJECT_ID;

// Timeline enum_option GIDs mapping
const timelineOptions = {
    'asap': '1208369425912600',
    '1-2-months': '1208393912239626',
    '3-6-months': '1208369425912634',
    'flexible': '1208393912239627'
};

// Budget enum_option GIDs mapping
const budgetOptions = {
    '2k-5k': '1208369425912638',
    '5k-10k': '1208369425912639',
    '10k-20k': '1208369425912640',
    '20k-50k': '1208369425912641',
    '50k-100k+': '1208369425912642'
};

// Source enum_option GIDs mapping
const sourceOptions = {
    'referral': '1208369425912646',
    'social-media': '1208369425912647',
    'google': '1208369425912648',
    'event': '1208369425912650',
    'other': '1208369425912651'
};

// Services checkbox GIDs mapping
const serviceOptions = {
    'brand-identity': '1208369425912593',
    'brand-strategy': '1208369425912597',
    'web-design': '1208393912239628',
    'ui-ux-design': '1208369425912594',
    'marketing-assets': '1208393912239629',
    'event-design': '1208393912239630',
    'development-services': '1208393912239631',
    'other-services': '1208393912239632'
};

// Endpoint to handle the form submission
app.post('/api/submit-form', async (req, res) => {
    console.log('Received request:', req.body); // Log the request body

    const { name, email, company, website, goals, timeline, budget, source, services } = req.body;

    // Get the selected timeline, budget, source GID
    const selectedTimelineGID = timelineOptions[timeline];
    const selectedBudgetGID = budgetOptions[budget];
    const selectedSourceGID = sourceOptions[source];

    // Map selected services (checkboxes) to their respective GIDs
    const selectedServicesGIDs = services.map(service => serviceOptions[service]);

    const taskData = {
        data: {
            name: `New Client Submission: ${name}`,
            projects: [PROJECT_ID],
            notes: `Email: ${email}\nCompany: ${company}\nWebsite: ${website}\nGoals: ${goals}\nTimeline: ${timeline}\nBudget: ${budget}\nSource: ${source}`,
            custom_fields: {
                '1208369425912572': email,  // GID for Email
                '1208369425912570': name,   // GID for Name
                '1208369425912574': company,  // GID for Company
                '1208369425912576': website,  // GID for Website
                '1208369425912590': goals,  // GID for Goals
                '1208369425912599': selectedTimelineGID,  // Timeline GID
                '1208369425912637': selectedBudgetGID,  // Budget GID
                '1208369425912645': selectedSourceGID,  // Source GID
                '1208369425912592': selectedServicesGIDs  // Services GIDs array
            }
        }
    };

    console.log(req.body);

    try {
        const response = await fetch('https://app.asana.com/api/1.0/tasks', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ASANA_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            return res.status(200).json({ message: 'Task successfully created in Asana' });
        } else {
            const error = await response.json();
            console.error('Error creating task in Asana:', error); // Log the error
            return res.status(500).json({ message: 'Error creating task in Asana', error });
        }
    } catch (error) {
        console.error('Server error:', error); // Log the server error
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});