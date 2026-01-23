import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const client = createClient({
    projectId: 't1lt9uvy',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Must be added to .env.local
    useCdn: false,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, mobile, projectType, message } = body;

        // Validate minimal fields
        if (!name || !mobile) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        if (!process.env.SANITY_API_TOKEN) {
            console.error('Missing SANITY_API_TOKEN. Submissions will fail to write to Sanity.');
            // Allow fallback or return error. 
            return NextResponse.json({ message: 'Configuration Error: Missing Write Token' }, { status: 500 });
        }

        const doc = {
            _type: 'lead',
            name,
            email,
            mobile,
            projectType,
            message,
            status: 'new',
        };

        await client.create(doc);

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('Lead Submission Error:', error);
        return NextResponse.json({ message: 'Error submitting lead' }, { status: 500 });
    }
}
