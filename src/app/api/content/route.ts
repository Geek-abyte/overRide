import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the content file
const contentFilePath = path.join(process.cwd(), 'public', 'content.json');
const tempContentFilePath = path.join(process.cwd(), 'public', 'content.json.tmp');

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
    const { section, data } = body;
    
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
      console.log('Reading content file from:', contentFilePath);
      
      // Read existing content
      let contentJson;
      try {
        contentJson = await fs.readFile(contentFilePath, 'utf8');
        console.log('Successfully read content file');
      } catch (readFileError: any) {
        console.error('Error reading content file:', readFileError);
        return NextResponse.json({ error: `Failed to read content file: ${readFileError.message}` }, { status: 500 });
      }
      
      let content;
      try {
        content = JSON.parse(contentJson);
        console.log('Successfully parsed content JSON');
      } catch (parseError: any) {
        console.error('Error parsing content JSON:', parseError);
        return NextResponse.json({ error: `Failed to parse content JSON: ${parseError.message}` }, { status: 500 });
      }
      
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

      // Write to a temporary file first
      try {
        const contentString = JSON.stringify(content, null, 2);
        
        // Write to temp file
        await fs.writeFile(tempContentFilePath, contentString, 'utf8');
        console.log('Successfully wrote to temporary file');
        
        // Rename temp file to final file (atomic operation)
        await fs.rename(tempContentFilePath, contentFilePath);
        console.log(`Content updated successfully for section: ${section}`);
      } catch (writeError: any) {
        console.error('Error writing to content file:', writeError);
        // Try to clean up temp file if it exists
        try {
          await fs.access(tempContentFilePath);
          await fs.unlink(tempContentFilePath);
        } catch (e) {
          // Ignore errors during cleanup
        }
        return NextResponse.json({ error: `Failed to write to content file: ${writeError.message}` }, { status: 500 });
      }
      
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (processError: any) {
      console.error('Error processing content:', processError);
      return NextResponse.json({ error: `Failed to process content: ${processError.message}` }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error processing content update request:', error);
    return NextResponse.json({ error: `Failed to update content: ${error.message}` }, { status: 500 });
  }
} 