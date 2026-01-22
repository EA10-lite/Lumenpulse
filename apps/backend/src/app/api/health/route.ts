import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    ok: true,
    service: 'backend',
    timestamp,
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
}

export async function POST() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    ok: true,
    service: 'backend',
    timestamp,
    method: 'POST',
    message: 'Health check endpoint is accessible via POST as well'
  });
}
