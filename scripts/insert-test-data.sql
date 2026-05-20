-- Test Data for Indra Cyber Home
-- Энэ script нь оюутан, багш, анги, хичээл зэрэг test өгөгдөл оруулна

-- ============================================
-- 1. DEPARTMENTS (Тэнхимүүд)
-- ============================================
INSERT INTO departments (id, name, code, description, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Програм хангамжийн тэнхим', 'SW', 'Програмчлал, веб хөгжүүлэлт', NOW(), NOW()),
  (gen_random_uuid(), 'Сүлжээний технологийн тэнхим', 'NET', 'Сүлжээний удирдлага, архитектур', NOW(), NOW()),
  (gen_random_uuid(), 'Мэдээллийн аюулгүй байдлын тэнхим', 'SEC', 'Кибер аюулгүй байдал, мэдээллийн хамгаалалт', NOW(), NOW()),
  (gen_random_uuid(), 'Мэдээлэл зүйн тэнхим', 'IS', 'Өгөгдлийн сан, шинжилгээ', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 2. MAJORS (Мэргэжлүүд)
-- ============================================
INSERT INTO majors (id, department_id, name, code, description, duration_years, total_credits, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  d.id,
  'Програм хангамж',
  'PSW',
  'Програмчлал, веб хөгжүүлэлт',
  4,
  120,
  NOW(),
  NOW()
FROM departments d WHERE d.code = 'SW'
ON CONFLICT (code) DO NOTHING;

INSERT INTO majors (id, department_id, name, code, description, duration_years, total_credits, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  d.id,
  'Сүлжээний технологи',
  'NET',
  'Сүлжээний удирдлага, архитектур',
  4,
  120,
  NOW(),
  NOW()
FROM departments d WHERE d.code = 'NET'
ON CONFLICT (code) DO NOTHING;

INSERT INTO majors (id, department_id, name, code, description, duration_years, total_credits, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  d.id,
  'Кибер аюулгүй байдал',
  'CYB',
  'Мэдээллийн аюулгүй байдал',
  4,
  120,
  NOW(),
  NOW()
FROM departments d WHERE d.code = 'SEC'
ON CONFLICT (code) DO NOTHING;

INSERT INTO majors (id, department_id, name, code, description, duration_years, total_credits, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  d.id,
  'Мэдээлэл зүй',
  'IS',
  'Өгөгдлийн сан, шинжилгээ',
  4,
  120,
  NOW(),
  NOW()
FROM departments d WHERE d.code = 'IS'
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- 3. TEACHERS (Багш нар)
-- ============================================

-- Багш 1: Б.Батбаяр (Програм хангамж)
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  -- Get department ID
  SELECT id INTO v_dept_id FROM departments WHERE code = 'SW';
  
  -- Insert user
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'batbayar@indra.edu.mn',
    'batbayar',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY', -- password: teacher123
    'TEACHER',
    'Батбаяр',
    'Б',
    '99001122',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  -- Insert teacher
  INSERT INTO teachers (id, user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'T2026001',
    v_dept_id,
    'Ахлах багш',
    ARRAY['JavaScript', 'React', 'Node.js'],
    '2020-09-01',
    2500000,
    40,
    NOW(),
    NOW()
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- Багш 2: Ц.Энхтуяа (Сүлжээ)
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  SELECT id INTO v_dept_id FROM departments WHERE code = 'NET';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'enkhtuya@indra.edu.mn',
    'enkhtuya',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'TEACHER',
    'Энхтуяа',
    'Ц',
    '99112233',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO teachers (id, user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'T2026002',
    v_dept_id,
    'Багш',
    ARRAY['Networking', 'Cisco', 'Security'],
    '2021-09-01',
    2200000,
    40,
    NOW(),
    NOW()
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- Багш 3: Д.Батжаргал (Аюулгүй байдал)
DO $$
DECLARE
  v_user_id UUID;
  v_dept_id UUID;
BEGIN
  SELECT id INTO v_dept_id FROM departments WHERE code = 'SEC';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'batjargal@indra.edu.mn',
    'batjargal_teacher',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'TEACHER',
    'Батжаргал',
    'Д',
    '99223344',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO teachers (id, user_id, teacher_id, department_id, position, specialization, hire_date, salary, max_hours_per_week, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'T2026003',
    v_dept_id,
    'Ахлах багш',
    ARRAY['Cybersecurity', 'Ethical Hacking', 'Penetration Testing'],
    '2019-09-01',
    2800000,
    40,
    NOW(),
    NOW()
  )
  ON CONFLICT (teacher_id) DO NOTHING;
END $$;

-- ============================================
-- 4. STUDENTS (Оюутнууд)
-- ============================================

-- Оюутан 1: Төртэмүүлэн (Програм хангамж)
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'tortemuulen@indra.edu.mn',
    'tortemuulen',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY', -- password: student123
    'STUDENT',
    'Төртэмүүлэн',
    '',
    '88001122',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (id, user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'B2026001',
    v_major_id,
    '2026-09-01',
    1,
    3.8,
    30,
    2500000,
    2500000,
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 2: Э.Батжаргал (Програм хангамж)
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'PSW';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'e.batjargal@indra.edu.mn',
    'e_batjargal',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'STUDENT',
    'Батжаргал',
    'Э',
    '88112233',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (id, user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'B2026002',
    v_major_id,
    '2026-09-01',
    1,
    3.5,
    30,
    2500000,
    2500000,
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 3: Ц.Мөнхбат (Сүлжээ)
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'NET';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'monkhbat@indra.edu.mn',
    'monkhbat',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'STUDENT',
    'Мөнхбат',
    'Ц',
    '88223344',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (id, user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'B2026003',
    v_major_id,
    '2026-09-01',
    1,
    3.2,
    30,
    2500000,
    1500000,
    1000000,
    NOW(),
    NOW()
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 4: Д.Сүхбат (Аюулгүй байдал)
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'CYB';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'sukhbat@indra.edu.mn',
    'sukhbat',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'STUDENT',
    'Сүхбат',
    'Д',
    '88334455',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (id, user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'B2026004',
    v_major_id,
    '2026-09-01',
    1,
    3.9,
    30,
    2500000,
    2500000,
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- Оюутан 5: Б.Ганбаяр (Мэдээлэл зүй)
DO $$
DECLARE
  v_user_id UUID;
  v_major_id UUID;
BEGIN
  SELECT id INTO v_major_id FROM majors WHERE code = 'IS';
  
  INSERT INTO users (id, email, username, password_hash, role, first_name, last_name, phone, status, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'ganbayar@indra.edu.mn',
    'ganbayar',
    '$2b$10$rQJ5cKHLZxKxZ0YvGfxLHOqK5vYxYxYxYxYxYxYxYxYxYxYxYxY',
    'STUDENT',
    'Ганбаяр',
    'Б',
    '88445566',
    'ACTIVE',
    NOW(),
    NOW()
  )
  ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
  RETURNING id INTO v_user_id;
  
  INSERT INTO students (id, user_id, student_id, major_id, enrollment_date, current_semester, gpa, total_credits, tuition_fee, paid_amount, remaining_amount, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    v_user_id,
    'B2026005',
    v_major_id,
    '2026-09-01',
    1,
    3.6,
    30,
    2500000,
    2000000,
    500000,
    NOW(),
    NOW()
  )
  ON CONFLICT (student_id) DO NOTHING;
END $$;

-- ============================================
-- 5. COURSES (Хичээлүүд)
-- ============================================

INSERT INTO courses (id, major_id, name, code, description, credits, hours, semester, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  m.id,
  'Програмчлалын үндэс',
  'CS101',
  'C, Python програмчлалын үндэс',
  3,
  45,
  1,
  NOW(),
  NOW()
FROM majors m WHERE m.code = 'PSW'
ON CONFLICT (code) DO NOTHING;

INSERT INTO courses (id, major_id, name, code, description, credits, hours, semester, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  m.id,
  'JavaScript',
  'CS201',
  'JavaScript програмчлал',
  3,
  45,
  2,
  NOW(),
  NOW()
FROM majors m WHERE m.code = 'PSW'
ON CONFLICT (code) DO NOTHING;

INSERT INTO courses (id, major_id, name, code, description, credits, hours, semester, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  m.id,
  'Сүлжээний үндэс',
  'NET101',
  'Сүлжээний технологийн үндэс',
  3,
  45,
  1,
  NOW(),
  NOW()
FROM majors m WHERE m.code = 'NET'
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- ДУУССАН!
-- ============================================

SELECT 'Test data амжилттай оруулагдлаа!' as message;
