import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withAuth, PERMISSIONS } from '@/lib/auth-middleware';

// GET /api/departments - Бүх тэнхимүүдийг авах
export async function GET(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ departments: data }, { status: 200 });
  } catch (error: any) {
    console.error('Get departments error:', error);
    return NextResponse.json(
      { error: error.message || 'Тэнхимүүдийг авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/departments - Шинэ тэнхим үүсгэх
export async function POST(request: NextRequest) {
  // Check authentication and authorization
  const authResult = await withAuth(request, PERMISSIONS.MANAGE_COURSES);
  if (authResult.error) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { name, code, description } = body;

    // Validation
    if (!name || !code) {
      return NextResponse.json(
        { error: 'Нэр болон код шаардлагатай' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('departments')
      .insert({
        name,
        code,
        description,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ department: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create department error:', error);
    return NextResponse.json(
      { error: error.message || 'Тэнхим үүсгэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}
