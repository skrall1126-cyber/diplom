import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, hashPassword } from '@/lib/auth';
import { userDb } from '@/lib/db';
import { requireAuth } from '@/lib/auth-middleware';

// POST /api/auth/change-password - Change user password
export async function POST(request: NextRequest) {
  // Check authentication
  const authResult = await requireAuth(request);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'Бүх талбаруудыг бөглөнө үү' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Шинэ нууц үг таарахгүй байна' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой' },
        { status: 400 }
      );
    }

    // Get user
    const user = await userDb.findById(authResult.user!.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Хэрэглэгч олдсонгүй' },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Одоогийн нууц үг буруу байна' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await userDb.update(user.id, {
      password: hashedPassword,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Нууц үг амжилттай солигдлоо' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: error.message || 'Нууц үг солихоор алдаа гарлаа' },
      { status: 500 }
    );
  }
}
