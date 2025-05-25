import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the content file
const contentFilePath = path.join(process.cwd(), 'public', 'content.json');

// Get content
export async function GET() {
  try {
    const content = await fs.readFile(contentFilePath, 'utf8');
    return NextResponse.json(JSON.parse(content), { status: 200 });
  } catch (error) {
    console.error('Error reading content file:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

// Update content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data, apiKey } = body;
    
    if (!section) {
      return NextResponse.json({ error: 'Missing section parameter' }, { status: 400 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Missing data parameter' }, { status: 400 });
    }
    
    // Skip API key validation in development - you can re-enable this for production
    // const validApiKey = process.env.CONTENT_API_KEY || 'default-dev-key';
    // const providedApiKey = apiKey || validApiKey;
    
    // if (providedApiKey !== validApiKey) {
    //   return NextResponse.json({ error: 'Unauthorized - Invalid API key' }, { status: 401 });
    // }

    try {
      // Read existing content
      const contentJson = await fs.readFile(contentFilePath, 'utf8');
      const content = JSON.parse(contentJson);
      
      // Update only the specified section
      if (section) {
        // Check if section exists
        if (!Object.prototype.hasOwnProperty.call(content, section)) {
          console.warn(`Creating new section "${section}" in content.json`);
        }
        
        // Update section
        content[section] = data;
      } else {
        // If no section specified, update the entire content (be careful with this!)
        Object.keys(data).forEach(key => {
          content[key] = data[key];
        });
      }

      // Write updated content back to file
      await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf8');
      
      console.log(`Content updated successfully for section: ${section}`);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (readError) {
      console.error('Error reading or parsing content file:', readError);
      return NextResponse.json({ error: 'Failed to read or parse content file' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing content update request:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
} 