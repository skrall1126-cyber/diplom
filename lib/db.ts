import { supabaseAdmin } from './supabase';

// ============================================
// ХЭРЭГЛЭГЧИЙН УДИРДЛАГА (User Management)
// ============================================

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'SUPER_ADMIN' | 'TRAINING_ADMIN' | 'FINANCE_ADMIN' | 'TEACHER' | 'STUDENT';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'GRADUATED';
  first_name: string;
  last_name: string;
  phone?: string;
  avatar?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export const userDb = {
  // Хэрэглэгч үүсгэх
  async create(data: Partial<User>) {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return user;
  },

  // ID-аар хэрэглэгч олох
  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Email-аар хэрэглэгч олох
  async findByEmail(email: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Username-аар хэрэглэгч олох
  async findByUsername(username: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Хэрэглэгч шинэчлэх
  async update(id: string, data: Partial<User>) {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return user;
  },

  // Хэрэглэгч устгах
  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Бүх хэрэглэгчдийг авах
  async findAll(filters?: { role?: string; status?: string }) {
    let query = supabaseAdmin.from('users').select('*');
    
    if (filters?.role) {
      query = query.eq('role', filters.role);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
};

// ============================================
// ОЮУТНЫ УДИРДЛАГА (Student Management)
// ============================================

export interface Student {
  id: string;
  user_id: string;
  student_id: string;
  major_id: string;
  class_id?: string;
  enrollment_date: string;
  expected_graduation_date?: string;
  current_semester: number;
  gpa?: number;
  total_credits: number;
  tuition_fee: number;
  paid_amount: number;
  remaining_amount: number;
  scholarship_amount?: number;
  created_at: string;
  updated_at: string;
}

export const studentDb = {
  async create(data: Partial<Student>) {
    const { data: student, error } = await supabaseAdmin
      .from('students')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return student;
  },

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('students')
      .select(`
        *,
        user:users(*),
        major:majors(*),
        class:classes(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findByStudentId(studentId: string) {
    const { data, error } = await supabaseAdmin
      .from('students')
      .select(`
        *,
        user:users(*),
        major:majors(*),
        class:classes(*)
      `)
      .eq('student_id', studentId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async findAll(filters?: { major_id?: string; class_id?: string; status?: string }) {
    let query = supabaseAdmin
      .from('students')
      .select(`
        *,
        user:users(*),
        major:majors(*),
        class:classes(*)
      `);
    
    if (filters?.major_id) {
      query = query.eq('major_id', filters.major_id);
    }
    if (filters?.class_id) {
      query = query.eq('class_id', filters.class_id);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(id: string, data: Partial<Student>) {
    const { data: student, error } = await supabaseAdmin
      .from('students')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return student;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// ============================================
// БАГШИЙН УДИРДЛАГА (Teacher Management)
// ============================================

export interface Teacher {
  id: string;
  user_id: string;
  teacher_id: string;
  department_id: string;
  position: string;
  specialization: string[];
  hire_date: string;
  salary: number;
  max_hours_per_week: number;
  created_at: string;
  updated_at: string;
}

export const teacherDb = {
  async create(data: Partial<Teacher>) {
    const { data: teacher, error } = await supabaseAdmin
      .from('teachers')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return teacher;
  },

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('teachers')
      .select(`
        *,
        user:users(*),
        department:departments(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findByTeacherId(teacherId: string) {
    const { data, error } = await supabaseAdmin
      .from('teachers')
      .select(`
        *,
        user:users(*),
        department:departments(*)
      `)
      .eq('teacher_id', teacherId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async findAll(filters?: { department_id?: string }) {
    let query = supabaseAdmin
      .from('teachers')
      .select(`
        *,
        user:users(*),
        department:departments(*)
      `);
    
    if (filters?.department_id) {
      query = query.eq('department_id', filters.department_id);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(id: string, data: Partial<Teacher>) {
    const { data: teacher, error } = await supabaseAdmin
      .from('teachers')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return teacher;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('teachers')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// ============================================
// АНГИ/БҮЛГИЙН УДИРДЛАГА (Class Management)
// ============================================

export interface Class {
  id: string;
  name: string;
  code: string;
  course_id: string;
  teacher_id: string;
  semester: string;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  start_date: string;
  end_date: string;
  max_students: number;
  room?: string;
  schedule?: string;
  created_at: string;
  updated_at: string;
}

export const classDb = {
  async create(data: Partial<Class>) {
    const { data: classData, error } = await supabaseAdmin
      .from('classes')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return classData;
  },

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('classes')
      .select(`
        *,
        course:courses(*),
        teacher:teachers(*, user:users(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findAll(filters?: { course_id?: string; teacher_id?: string; status?: string }) {
    let query = supabaseAdmin
      .from('classes')
      .select(`
        *,
        course:courses(*),
        teacher:teachers(*, user:users(*))
      `);
    
    if (filters?.course_id) {
      query = query.eq('course_id', filters.course_id);
    }
    if (filters?.teacher_id) {
      query = query.eq('teacher_id', filters.teacher_id);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(id: string, data: Partial<Class>) {
    const { data: classData, error } = await supabaseAdmin
      .from('classes')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return classData;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('classes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// ============================================
// ТӨЛБӨРИЙН УДИРДЛАГА (Payment Management)
// ============================================

export interface Payment {
  id: string;
  student_id: string;
  amount: number;
  payment_method: 'CASH' | 'BANK_TRANSFER' | 'CARD' | 'QPAY' | 'SOCIAL_PAY';
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  due_date: string;
  paid_date?: string;
  semester: string;
  academic_year: string;
  description?: string;
  receipt_number?: string;
  created_at: string;
  updated_at: string;
}

export const paymentDb = {
  async create(data: Partial<Payment>) {
    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return payment;
  },

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select(`
        *,
        student:students(*, user:users(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findByStudent(studentId: string) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async findAll(filters?: { status?: string; semester?: string }) {
    let query = supabaseAdmin
      .from('payments')
      .select(`
        *,
        student:students(*, user:users(*))
      `);
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.semester) {
      query = query.eq('semester', filters.semester);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(id: string, data: Partial<Payment>) {
    const { data: payment, error } = await supabaseAdmin
      .from('payments')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return payment;
  }
};

// ============================================
// ЦАЛИНГИЙН УДИРДЛАГА (Salary Management)
// ============================================

export interface Salary {
  id: string;
  teacher_id: string;
  base_salary: number;
  bonus?: number;
  deductions?: number;
  net_salary: number;
  month: string;
  payment_date?: string;
  status: 'PENDING' | 'PAID';
  teaching_hours?: number;
  overtime_hours?: number;
  bonus_reason?: string;
  created_at: string;
  updated_at: string;
}

export const salaryDb = {
  async create(data: Partial<Salary>) {
    const { data: salary, error } = await supabaseAdmin
      .from('salaries')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return salary;
  },

  async findById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('salaries')
      .select(`
        *,
        teacher:teachers(*, user:users(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async findByTeacher(teacherId: string) {
    const { data, error } = await supabaseAdmin
      .from('salaries')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('month', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async findAll(filters?: { status?: string; month?: string }) {
    let query = supabaseAdmin
      .from('salaries')
      .select(`
        *,
        teacher:teachers(*, user:users(*))
      `);
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.month) {
      query = query.eq('month', filters.month);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async update(id: string, data: Partial<Salary>) {
    const { data: salary, error } = await supabaseAdmin
      .from('salaries')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return salary;
  }
};
