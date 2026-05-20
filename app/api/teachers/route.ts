import { NextRequest, NextResponse } from 'next/server';
import { teacherDb } from '@/lib/db';

// GET /api/teachers - Бүх багш нарыг авах
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department_id = searchParams.get('department_id') || undefined;

    const teachers = await teacherDb.findAll({ department_id });

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error: any) {
    console.error('Get teachers error:', error);
    return NextResponse.json(
      { error: error.message || 'Багш нарыг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/teachers - Шинэ багш үүсгэх
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const teacher = await teacherDb.create(body);

    return NextResponse.json({ teacher }, { status: 201 });
  } catch (error: any) {
    console.error('Create teacher error:', error);
    return NextResponse.json(
      { error: error.message || 'Багш үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
