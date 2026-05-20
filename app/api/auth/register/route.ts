import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password, role, first_name, last_name, phone } = body;

    // Validation
    if (!email || !username || !password || !role || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'Шаардлагатай талбаруудыг бөглөнө үү' },
        { status: 400 }
      );
    }

    // Register
    const result = await register({
      email,
      username,
      password,
      role,
      first_name,
      last_name,
      phone
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error.message || 'Бүртгэх явцад алдаа гарлаа' },
      { status: 400 }
    );
  }
}
