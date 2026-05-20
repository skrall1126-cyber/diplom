import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/health - Health check endpoint
export async function GET() {
  try {
    const startTime = Date.now();
    
    // Database connectivity check
    const { error: dbError, count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    const dbLatency = Date.now() - startTime;
    
    if (dbError) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          checks: {
            database: {
              status: 'down',
              error: dbError.message,
              latency: dbLatency,
            },
          },
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      checks: {
        database: {
          status: 'up',
          latency: dbLatency,
          recordCount: count,
        },
      },
    });
  } catch (error: any) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: process.env.NODE_ENV === 'production' 
          ? 'Service unavailable' 
          : error.message,
      },
      { status: 503 }
    );
  }
}
