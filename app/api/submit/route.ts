import { NextRequest, NextResponse } from 'next/server';
import { ApplicationFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const data: ApplicationFormData = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.instagramHandle) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Here you would:
    // 1. Save to your Cloudflare D1 database
    // 2. Send confirmation email
    // 3. Trigger notification to admin
    // 4. Log the application
    
    console.log('New application received:', {
      name: data.fullName,
      email: data.email,
      handle: data.instagramHandle,
      followers: data.followers,
      niche: data.niche,
      timestamp: new Date().toISOString()
    });
    
    // Simulate database save
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      nextSteps: [
        'Our team will review your application within 48 hours',
        'Check your email for confirmation',
        'You can track your application status in the dashboard'
      ],
      estimatedReviewTime: '48 hours'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: true, 
      message: 'API is running',
      endpoints: {
        POST: '/api/submit - Submit new application',
        GET: '/api/submit - API status'
      }
    },
    { status: 200 }
  );
}