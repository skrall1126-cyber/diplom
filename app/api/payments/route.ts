import { NextRequest, NextResponse } from 'next/server';
import { paymentDb } from '@/lib/db';
import { withAuth, PERMISSIONS, hasPermission } from '@/lib/auth-middleware';

// GET /api/payments - Бүх төлбөрүүдийг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_PAYMENTS);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const semester = searchParams.get('semester') || undefined;

    const payments = await paymentDb.findAll({ status, semester });

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error: any) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: error.message || 'Төлбөрүүдийг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Шинэ төлбөр үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_PAYMENTS);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();

    const payment = await paymentDb.create(body);

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error: any) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { error: error.message || 'Төлбөр үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
