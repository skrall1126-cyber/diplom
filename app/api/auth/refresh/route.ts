import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/auth';

// POST /api/auth/refresh - Refresh access token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token шаардлагатай' },
        { status: 400 }
      );
    }

    const result = await refreshAccessToken(refreshToken);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: error.message || 'Token сэргээхэд алдаа гарлаа' },
      { status: 401 }
    );
  }
}
