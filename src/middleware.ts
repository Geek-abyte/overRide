import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply to /api/content POST requests (for saving content)
  if (request.nextUrl.pathname === '/api/content' && request.method === 'POST') {
    // API security is handled by the API route itself with the API key
    return NextResponse.next();
  }

  // No special handling for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/content', '/admin/:path*'],
}; 