import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Хэрэглэгчийн нэр болон нууц үг шаардлагатай' },
        { status: 400 }
      );
    }

    // Login
    const result = await login(username, password);

    // Create response with token in cookie
    const response = NextResponse.json(result, { status: 200 });
    
    // Set token in HTTP-only cookie (more secure)
    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Нэвтрэх явцад алдаа гарлаа' },
      { status: 401 }
    );
  }
}
