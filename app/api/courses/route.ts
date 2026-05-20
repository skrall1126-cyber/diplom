import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withAuth, PERMISSIONS } from '@/lib/auth-middleware';

// GET /api/courses - Бүх хичээлүүдийг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const major_id = searchParams.get('major_id');

    let query = supabase
      .from('courses')
      .select(`
        *,
        major:majors(id, name)
      `)
      .order('created_at', { ascending: false });

    if (major_id) {
      query = query.eq('major_id', major_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ courses: data }, { status: 200 });
  } catch (error: any) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: error.message || 'Хичээлүүдийг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Шинэ хичээл үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { code, name, major_id, credits, description } = body;

    // Validation
    if (!code || !name || !major_id) {
      return NextResponse.json(
        { error: 'Код, нэр болон мэргэжил шаардлагатай' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('courses')
      .insert({
        code,
        name,
        major_id,
        credits: credits || 3,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ course: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { error: error.message || 'Хичээл үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
