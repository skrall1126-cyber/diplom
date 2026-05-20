import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withAuth, PERMISSIONS } from '@/lib/auth-middleware';

// GET /api/classes - Бүх ангиудыг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_CLASSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const major_id = searchParams.get('major_id');

    let query = supabase
      .from('classes')
      .select(`
        *,
        major:majors(id, name),
        teacher:teachers(id, first_name, last_name)
      `)
      .order('created_at', { ascending: false });

    if (major_id) {
      query = query.eq('major_id', major_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ classes: data }, { status: 200 });
  } catch (error: any) {
    console.error('Get classes error:', error);
    return NextResponse.json(
      { error: error.message || 'Ангиудыг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/classes - Шинэ анги үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_CLASSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { name, major_id, teacher_id, capacity, schedule } = body;

    // Validation
    if (!name || !major_id) {
      return NextResponse.json(
        { error: 'Нэр болон мэргэжил шаардлагатай' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('classes')
      .insert({
        name,
        major_id,
        teacher_id,
        capacity: capacity || 30,
        schedule: schedule || {},
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ class: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create class error:', error);
    return NextResponse.json(
      { error: error.message || 'Анги үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
