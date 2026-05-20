import { NextRequest, NextResponse } from 'next/server';
import { salaryDb } from '@/lib/db';
import { withAuth, PERMISSIONS, hasPermission } from '@/lib/auth-middleware';

// GET /api/salaries - Бүх цалингуудыг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_SALARIES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const month = searchParams.get('month') || undefined;

    const salaries = await salaryDb.findAll({ status, month });

    return NextResponse.json({ salaries }, { status: 200 });
  } catch (error: any) {
    console.error('Get salaries error:', error);
    return NextResponse.json(
      { error: error.message || 'Цалингуудыг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/salaries - Шинэ цалин үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_SALARIES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();

    const salary = await salaryDb.create(body);

    return NextResponse.json({ salary }, { status: 201 });
  } catch (error: any) {
    console.error('Create salary error:', error);
    return NextResponse.json(
      { error: error.message || 'Цалин үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
