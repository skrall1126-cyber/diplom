import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withAuth, PERMISSIONS } from '@/lib/auth-middleware';

// GET /api/majors - Бүх мэргэжлүүдийг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { searchParams } = new URL(request.url);
    const department_id = searchParams.get('department_id');

    let query = supabase
      .from('majors')
      .select(`
        *,
        department:departments(id, name)
      `)
      .order('created_at', { ascending: false });

    if (department_id) {
      query = query.eq('department_id', department_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ majors: data }, { status: 200 });
  } catch (error: any) {
    console.error('Get majors error:', error);
    return NextResponse.json(
      { error: error.message || 'Мэргэжлүүдийг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/majors - Шинэ мэргэжил үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { code, name, department_id, duration_years, description } = body;

    // Validation
    if (!code || !name || !department_id) {
      return NextResponse.json(
        { error: 'Код, нэр болон тэнхим шаардлагатай' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('majors')
      .insert({
        code,
        name,
        department_id,
        duration_years: duration_years || 4,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ major: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create major error:', error);
    return NextResponse.json(
      { error: error.message || 'Мэргэжил үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
