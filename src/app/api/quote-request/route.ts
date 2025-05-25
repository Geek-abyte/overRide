import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path for storing quote requests (for demo purposes)
const quoteRequestsPath = path.join(process.cwd(), 'public', 'quote-requests.json');

// Initialize quote requests file if it doesn't exist
async function ensureQuoteRequestsFile() {
  try {
    await fs.access(quoteRequestsPath);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(quoteRequestsPath, JSON.stringify([], null, 2), 'utf8');
  }
}

// Process and save the quote request
async function saveQuoteRequest(data: any) {
  await ensureQuoteRequestsFile();
  
  // Read existing requests
  const requestsJSON = await fs.readFile(quoteRequestsPath, 'utf8');
  const requests = JSON.parse(requestsJSON);
  
  // Add timestamp and ID to the new request
  const newRequest = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...data
  };
  
  // Add to requests array
  requests.push(newRequest);
  
  // Save back to file
  await fs.writeFile(quoteRequestsPath, JSON.stringify(requests, null, 2), 'utf8');
  
  return newRequest;
}

// Send email notification - this would be implemented with a real email service
// For this demo, we'll just log the email content
async function mockEmailNotification(data: any) {
  console.log('🔶 Quote Request Email Notification:');
  console.log(`From: ${data.name} (${data.email})`);
  console.log(`Service: ${data.service}`);
  console.log(`Message: ${data.message}`);
  return true;
}

// Handle quote request submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' }, 
        { status: 400 }
      );
    }
    
    // Save the quote request
    const savedRequest = await saveQuoteRequest(body);
    
    // Mock email notification (in a real app, use a service like Nodemailer, SendGrid, etc.)
    await mockEmailNotification(body);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request received successfully',
        requestId: savedRequest.id
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' }, 
      { status: 500 }
    );
  }
}