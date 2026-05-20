-- Simple Test Data for Indra Cyber Home
-- Зөвхөн үндсэн өгөгдөл оруулна

-- ============================================
-- 1. DEPARTMENTS (Тэнхимүүд)
-- ============================================
-- Эхлээд байгаа эсэхийг шалгаад, байхгүй бол оруулна
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM departments WHERE code = 'SW') THEN
    INSERT INTO departments (name, code, description)
    VALUES ('Програм хангамжийн тэнхим', 'SW', 'Програмчлал, веб хөгжүүлэлт');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM departments WHERE code = 'NET') THEN
    INSERT INTO departments (name, code, description)
    VALUES ('Сүлжээний технологийн тэнхим', 'NET', 'Сүлжээний удирдлага, архитектур');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM departments WHERE code = 'SEC') THEN
    INSERT INTO departments (name, code, description)
    VALUES ('Мэдээллийн аюулгүй байдлын тэнхим', 'SEC', 'Кибер аюулгүй байдал');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM departments WHERE code = 'IS') THEN
    INSERT INTO departments (name, code, description)
    VALUES ('Мэдээлэл зүйн тэнхим', 'IS', 'Өгөгдлийн сан, шинжилгээ');
  END IF;
END $$;

-- ============================================
-- 2. MAJORS (Мэргэжлүүд)
-- ============================================
DO $$
DECLARE
  v_dept_id UUID;
BEGIN
  -- Програм хангамж
  IF NOT EXISTS (SELECT 1 FROM majors WHERE code = 'PSW') THEN
    SELECT id INTO v_dept_id FROM departments WHERE code = 'SW';
    INSERT INTO majors (department_id, name, code, description, duration_years, total_credits)
    VALUES (v_dept_id, 'Програм хангамж', 'PSW', 'Програмчлал, веб хөгжүүлэлт', 4, 120);
  END IF;
  
  -- Сүлжээний технологи
  IF NOT EXISTS (SELECT 1 FROM majors WHERE code = 'NET') THEN
    SELECT id INTO v_dept_id FROM departments WHERE code = 'NET';
    INSERT INTO majors (department_id, name, code, description, duration_years, total_credits)
    VALUES (v_dept_id, 'Сүлжээний технологи', 'NET', 'Сүлжээний удирдлага', 4, 120);
  END IF;
  
  -- Кибер аюулгүй байдал
  IF NOT EXISTS (SELECT 1 FROM majors WHERE code = 'CYB') THEN
    SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
    INSERT INTO majors (department_id, name, code, description, duration_years, total_credits)
    VALUES (v_dept_id, 'Кибер аюулгүй байдал', 'CYB', 'Мэдээллийн аюулгүй байдал', 4, 120);
  END IF;
  
  -- Мэдээлэл зүй
  IF NOT EXISTS (SELECT 1 FROM majors WHERE code = 'IS') THEN
    SELECT id INTO v_dept_id FROM departments WHERE code = 'IS';
    INSERT INTO majors (department_id, name, code, description, duration_years, total_credits)
    VALUES (v_dept_id, 'Мэдээлэл зүй', 'IS', 'Өгөгдлийн сан', 4, 120);
  END IF;
END $$;

-- ============================================
-- 3. TEACHERS (Багш нар)
-- ============================================

-- Багш 1: Б.Батбаяр
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  SELECT id INTO v_dept_id FROM departments WHERE code = 'SW';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'batbayar@indra.edu.mn',
    'batbayar',
    '$2b$10$YourHashHere',
    'TEACHER',
    'Батбаяр',
    'Б',
    '99001122',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO teachers (user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week)
  VALUES (
    v_user_id,
    'T2026001',
    v_dept_id,
    'Ахлах багш',
    ARRAY['JavaScript', 'React', 'Node.js'],
    '2020-09-01',
    2500000,
    40
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- Багш 2: Ц.Энхтуяа
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  SELECT id INTO v_dept_id FROM departments WHERE code = 'NET';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'enkhtuya@indra.edu.mn',
    'enkhtuya',
    '$2b$10$YourHashHere',
    'TEACHER',
    'Энхтуяа',
    'Ц',
    '99112233',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO teachers (user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week)
  VALUES (
    v_user_id,
    'T2026002',
    v_dept_id,
    'Багш',
    ARRAY['Networking', 'Cisco'],
    '2021-09-01',
    2200000,
    40
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- Багш 3: Д.Батжаргал
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'batjargal@indra.edu.mn',
    'batjargal_teacher',
    '$2b$10$YourHashHere',
    'TEACHER',
    'Батжаргал',
    'Д',
    '99223344',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO teachers (user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week)
  VALUES (
    v_user_id,
    'T2026003',
    v_dept_id,
    'Ахлах багш',
    ARRAY['Cybersecurity', 'Hacking'],
    '2019-09-01',
    2800000,
    40
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- ============================================
-- 4. STUDENTS (Оюутнууд)
-- ============================================

-- Оюутан 1: Төртэмүүлэн
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'tortemuulen@indra.edu.mn',
    'tortemuulen',
    '$2b$10$YourHashHere',
    'STUDENT',
    'Төртэмүүлэн',
    '',
    '88001122',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount)
  VALUES (
    v_user_id,
    'B2026001',
    v_major_id,
    '2026-09-01',
    1,
    3.8,
    30,
    2500000,
    2500000,
    0
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 2: Э.Батжаргал
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'e.batjargal@indra.edu.mn',
    'e_batjargal',
    '$2b$10$YourHashHere',
    'STUDENT',
    'Батжаргал',
    'Э',
    '88112233',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount)
  VALUES (
    v_user_id,
    'B2026002',
    v_major_id,
    '2026-09-01',
    1,
    3.5,
    30,
    2500000,
    2500000,
    0
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 3: Ц.Мөнхбат
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'NET';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'monkhbat@indra.edu.mn',
    'monkhbat',
    '$2b$10$YourHashHere',
    'STUDENT',
    'Мөнхбат',
    'Ц',
    '88223344',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount)
  VALUES (
    v_user_id,
    'B2026003',
    v_major_id,
    '2026-09-01',
    1,
    3.2,
    30,
    2500000,
    1500000,
    1000000
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 4: Д.Сүхбат
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'CYB';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'sukhbat@indra.edu.mn',
    'sukhbat',
    '$2b$10$YourHashHere',
    'STUDENT',
    'Сүхбат',
    'Д',
    '88334455',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount)
  VALUES (
    v_user_id,
    'B2026004',
    v_major_id,
    '2026-09-01',
    1,
    3.9,
    30,
    2500000,
    2500000,
    0
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 5: Б.Ганбаяр
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'IS';
  
  INSERT INTO users (email, username, password_hash, role, first_name, last_name, phone, status)
  VALUES (
    'ganbayar@indra.edu.mn',
    'ganbayar',
    '$2b$10$YourHashHere',
    'STUDENT',
    'Ганбаяр',
    'Б',
    '88445566',
    'ACTIVE'
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount)
  VALUES (
    v_user_id,
    'B2026005',
    v_major_id,
    '2026-09-01',
    1,
    3.6,
    30,
    2500000,
    2000000,
    500000
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- ============================================
-- 5. COURSES (Хичээлүүд)
-- ============================================
DO $$
DECLARE
  v_major_id UUID;
BEGIN
  -- Програмчлалын үндэс
  IF NOT EXISTS (SELECT 1 FROM courses WHERE code = 'CS101') THEN
    SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
    INSERT INTO courses (major_id, name, code, description, credits, hours, semester)
    VALUES (v_major_id, 'Програмчлалын үндэс', 'CS101', 'C, Python програмчлалын үндэс', 3, 45, 1);
  END IF;
  
  -- JavaScript
  IF NOT EXISTS (SELECT 1 FROM courses WHERE code = 'CS201') THEN
    SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
    INSERT INTO courses (major_id, name, code, description, credits, hours, semester)
    VALUES (v_major_id, 'JavaScript', 'CS201', 'JavaScript програмчлал', 3, 45, 2);
  END IF;
  
  -- Сүлжээний үндэс
  IF NOT EXISTS (SELECT 1 FROM courses WHERE code = 'NET101') THEN
    SELECT id INTO v_major_id FROM majors WHERE code = 'NET';
    INSERT INTO courses (major_id, name, code, description, credits, hours, semester)
    VALUES (v_major_id, 'Сүлжээний үндэс', 'NET101', 'Сүлжээний технологийн үндэс', 3, 45, 1);
  END IF;
END $$;

-- ============================================
-- VERIFY
-- ============================================
SELECT 'Departments: ' || COUNT(*)::text FROM departments;
SELECT 'Majors: ' || COUNT(*)::text FROM majors;
SELECT 'Teachers: ' || COUNT(*)::text FROM teachers;
SELECT 'Students: ' || COUNT(*)::text FROM students;
SELECT 'Courses: ' || COUNT(*)::text FROM courses;
