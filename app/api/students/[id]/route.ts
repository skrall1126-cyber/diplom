import { NextRequest, NextResponse } from 'next/server';
import { studentDb } from '@/lib/db';

// GET /api/students/[id] - Нэг оюутны мэдээлэл авах
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await studentDb.findById(params.id);

    if (!student) {
      return NextResponse.json(
        { error: 'Оюутан олдсонгүй' },
        { status: 404 }
      );
    }

    return NextResponse.json({ student }, { status: 200 });
  } catch (error: any) {
    console.error('Get student error:', error);
    return NextResponse.json(
      { error: error.message || 'Оюутны мэдээлэл авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id] - Оюутны мэдээлэл шинэчлэх
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const student = await studentDb.update(params.id, body);

    return NextResponse.json({ student }, { status: 200 });
  } catch (error: any) {
    console.error('Update student error:', error);
    return NextResponse.json(
      { error: error.message || 'Оюутны мэдээлэл шинэчлэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// DELETE /api/students/[id] - Оюутан устгах
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await studentDb.delete(params.id);

    return NextResponse.json(
      { message: 'Оюутан амжилттай устгагдлаа' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete student error:', error);
    return NextResponse.json(
      { error: error.message || 'Оюутан устгахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}
