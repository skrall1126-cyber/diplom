import { NextRequest, NextResponse } from 'next/server';
import { studentDb } from '@/lib/db';
import { withAuth, PERMISSIONS } from '@/lib/auth-middleware';

// GET /api/students - Бүх оюутнуудыг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.VIEW_STUDENTS);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const major_id = searchParams.get('major_id') || undefined;
    const class_id = searchParams.get('class_id') || undefined;
    const status = searchParams.get('status') || undefined;

    const students = await studentDb.findAll({ major_id, class_id, status });

    return NextResponse.json({ students }, { status: 200 });
  } catch (error: any) {
    console.error('Get students error:', error);
    return NextResponse.json(
      { error: error.message || 'Оюутнуудыг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/students - Шинэ оюутан үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_STUDENTS);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();

    const student = await studentDb.create(body);

    return NextResponse.json({ student }, { status: 201 });
  } catch (error: any) {
    console.error('Create student error:', error);
    return NextResponse.json(
      { error: error.message || 'Оюутан үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
