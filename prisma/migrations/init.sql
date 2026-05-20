-- Indra Cyber School Management System - Database Schema
-- Supabase SQL Editor дээр ажиллуулах

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN', 'TEACHER', 'STUDENT');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'GRADUATED');
CREATE TYPE class_status AS ENUM ('PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');
CREATE TYPE payment_method AS ENUM ('CASH', 'BANK_TRANSFER', 'CARD', 'QPAY', 'SOCIAL_PAY');
CREATE TYPE asset_status AS ENUM ('ACTIVE', 'MAINTENANCE', 'STORAGE', 'DISPOSED');
CREATE TYPE asset_condition AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR');

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role NOT NULL,
    status user_status DEFAULT 'ACTIVE' NOT NULL,
    
    -- Profile
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    avatar TEXT,
    date_of_birth TIMESTAMP,
    gender TEXT,
    address TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- ============================================
-- ADMINS TABLE
-- ============================================

CREATE TABLE admins (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admin_type user_role NOT NULL,
    department TEXT,
    position TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_admins_user_id ON admins(user_id);

-- ============================================
-- DEPARTMENTS TABLE
-- ============================================

CREATE TABLE departments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ============================================
-- MAJORS TABLE
-- ============================================

CREATE TABLE majors (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    code TEXT UNIQUE NOT NULL,
    department_id TEXT NOT NULL REFERENCES departments(id),
    duration INTEGER NOT NULL,
    total_credits INTEGER NOT NULL,
    tuition_fee DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_majors_department_id ON majors(department_id);

-- ============================================
-- COURSES TABLE
-- ============================================

CREATE TABLE courses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    major_id TEXT NOT NULL REFERENCES majors(id),
    credits INTEGER NOT NULL,
    hours INTEGER NOT NULL,
    level TEXT NOT NULL,
    semester INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_courses_major_id ON courses(major_id);
CREATE INDEX idx_courses_code ON courses(code);

-- ============================================
-- TEACHERS TABLE
-- ============================================

CREATE TABLE teachers (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    teacher_id TEXT UNIQUE NOT NULL,
    department_id TEXT NOT NULL REFERENCES departments(id),
    position TEXT NOT NULL,
    specialization TEXT[] NOT NULL,
    hire_date TIMESTAMP NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    max_hours_per_week INTEGER DEFAULT 20 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_teachers_teacher_id ON teachers(teacher_id);
CREATE INDEX idx_teachers_department_id ON teachers(department_id);

-- ============================================
-- CLASSES TABLE
-- ============================================

CREATE TABLE classes (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    course_id TEXT NOT NULL REFERENCES courses(id),
    teacher_id TEXT NOT NULL REFERENCES teachers(id),
    semester TEXT NOT NULL,
    status class_status DEFAULT 'PLANNED' NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    max_students INTEGER DEFAULT 30 NOT NULL,
    room TEXT,
    schedule TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_classes_course_id ON classes(course_id);
CREATE INDEX idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX idx_classes_status ON classes(status);

-- ============================================
-- STUDENTS TABLE
-- ============================================

CREATE TABLE students (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id TEXT UNIQUE NOT NULL,
    major_id TEXT NOT NULL REFERENCES majors(id),
    class_id TEXT REFERENCES classes(id),
    enrollment_date TIMESTAMP NOT NULL,
    expected_graduation_date TIMESTAMP,
    current_semester INTEGER DEFAULT 1 NOT NULL,
    gpa DECIMAL(3,2),
    total_credits INTEGER DEFAULT 0 NOT NULL,
    tuition_fee DECIMAL(12,2) NOT NULL,
    paid_amount DECIMAL(12,2) DEFAULT 0 NOT NULL,
    remaining_amount DECIMAL(12,2) NOT NULL,
    scholarship_amount DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_students_major_id ON students(major_id);
CREATE INDEX idx_students_class_id ON students(class_id);

-- ============================================
-- ENROLLMENTS TABLE
-- ============================================

CREATE TABLE enrollments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'ACTIVE' NOT NULL,
    UNIQUE(student_id, class_id)
);

CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_class_id ON enrollments(class_id);

-- ============================================
-- ATTENDANCE TABLE
-- ============================================

CREATE TABLE attendance (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    status attendance_status NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE(student_id, class_id, date)
);

CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_class_id ON attendance(class_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- ============================================
-- GRADES TABLE
-- ============================================

CREATE TABLE grades (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id TEXT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    teacher_id TEXT NOT NULL REFERENCES teachers(id),
    midterm_score DECIMAL(5,2),
    final_score DECIMAL(5,2),
    assignment_score DECIMAL(5,2),
    attendance_score DECIMAL(5,2),
    total_score DECIMAL(5,2),
    letter_grade TEXT,
    gpa DECIMAL(3,2),
    semester TEXT NOT NULL,
    status TEXT DEFAULT 'IN_PROGRESS' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE(student_id, class_id, semester)
);

CREATE INDEX idx_grades_student_id ON grades(student_id);
CREATE INDEX idx_grades_class_id ON grades(class_id);
CREATE INDEX idx_grades_teacher_id ON grades(teacher_id);

-- ============================================
-- PAYMENTS TABLE
-- ============================================

CREATE TABLE payments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    payment_method payment_method NOT NULL,
    status payment_status DEFAULT 'PENDING' NOT NULL,
    due_date TIMESTAMP NOT NULL,
    paid_date TIMESTAMP,
    semester TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    description TEXT,
    receipt_number TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(due_date);

-- ============================================
-- SALARIES TABLE
-- ============================================

CREATE TABLE salaries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    base_salary DECIMAL(12,2) NOT NULL,
    bonus DECIMAL(12,2) DEFAULT 0,
    deductions DECIMAL(12,2) DEFAULT 0,
    net_salary DECIMAL(12,2) NOT NULL,
    month TEXT NOT NULL,
    payment_date TIMESTAMP,
    status TEXT DEFAULT 'PENDING' NOT NULL,
    teaching_hours INTEGER,
    overtime_hours INTEGER,
    bonus_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE(teacher_id, month)
);

CREATE INDEX idx_salaries_teacher_id ON salaries(teacher_id);
CREATE INDEX idx_salaries_month ON salaries(month);
CREATE INDEX idx_salaries_status ON salaries(status);

-- ============================================
-- ASSETS TABLE
-- ============================================

CREATE TABLE assets (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    value DECIMAL(12,2) NOT NULL,
    location TEXT NOT NULL,
    status asset_status DEFAULT 'ACTIVE' NOT NULL,
    condition asset_condition DEFAULT 'GOOD' NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    warranty_until TIMESTAMP,
    last_maintenance TIMESTAMP,
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_assets_status ON assets(status);

-- ============================================
-- MAINTENANCE RECORDS TABLE
-- ============================================

CREATE TABLE maintenance_records (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    maintenance_type TEXT NOT NULL,
    description TEXT NOT NULL,
    cost DECIMAL(12,2) NOT NULL,
    maintenance_date TIMESTAMP NOT NULL,
    next_maintenance_date TIMESTAMP,
    performed_by TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_maintenance_records_asset_id ON maintenance_records(asset_id);
CREATE INDEX idx_maintenance_records_date ON maintenance_records(maintenance_date);

-- ============================================
-- SYSTEM SETTINGS TABLE
-- ============================================

CREATE TABLE system_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ============================================
-- AUDIT LOGS TABLE
-- ============================================

CREATE TABLE audit_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_majors_updated_at BEFORE UPDATE ON majors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salaries_updated_at BEFORE UPDATE ON salaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (for API routes)
CREATE POLICY "Service role can do everything" ON users FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON admins FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON departments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON majors FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON courses FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON teachers FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON classes FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON students FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON enrollments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON attendance FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON grades FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON payments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON salaries FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON assets FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON maintenance_records FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON system_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can do everything" ON audit_logs FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample departments
INSERT INTO departments (id, name, code, description) VALUES
('dept_001', 'Програм хангамжийн тэнхим', 'SW', 'Програм хангамж хөгжүүлэлт'),
('dept_002', 'Сүлжээний технологийн тэнхим', 'NET', 'Сүлжээний технологи'),
('dept_003', 'Мэдээллийн аюулгүй байдлын тэнхим', 'SEC', 'Кибер аюулгүй байдал'),
('dept_004', 'Мэдээлэл зүйн тэнхим', 'IT', 'Мэдээллийн технологи');

-- Insert sample majors
INSERT INTO majors (id, name, code, department_id, duration, total_credits, tuition_fee) VALUES
('major_001', 'Програм хангамжийн инженерчлэл', 'SWE', 'dept_001', 4, 120, 3500000),
('major_002', 'Сүлжээний технологи', 'NET', 'dept_002', 4, 120, 3500000),
('major_003', 'Мэдээллийн аюулгүй байдал', 'CYB', 'dept_003', 4, 120, 3800000),
('major_004', 'Мэдээлэл зүй', 'IT', 'dept_004', 4, 120, 3200000);

-- Insert sample admin user (username: admin, password: admin123)
INSERT INTO users (id, email, username, password, role, status, first_name, last_name) VALUES
('user_admin_001', 'admin@indra-cyber.edu.mn', 'admin', '$2a$10$rOzJQjYqYxZ5Y5Z5Y5Z5YeK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'SUPER_ADMIN', 'ACTIVE', 'Админ', 'Систем');

INSERT INTO admins (id, user_id, admin_type, position) VALUES
('admin_001', 'user_admin_001', 'SUPER_ADMIN', 'Системийн админ');

COMMENT ON DATABASE postgres IS 'Indra Cyber School Management System Database';
