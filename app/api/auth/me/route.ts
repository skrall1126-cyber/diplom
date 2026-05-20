import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header шаардлагатай' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = await getCurrentUser(token);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: error.message || 'Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа' },
      { status: 401 }
    );
  }
}
