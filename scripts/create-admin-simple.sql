-- ============================================
-- АДМИН ХЭРЭГЛЭГЧ ҮҮСГЭХ (Энгийн арга)
-- ============================================
-- Энэ SQL-ийг Supabase SQL Editor дээр шууд ажиллуулна уу
-- https://supabase.com/dashboard/project/xdywicnxzgtstrslhvcu/sql

-- Эхлээд users table байгаа эсэхийг шалгах
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Супер админ үүсгэх
INSERT INTO users (
  email, username, password, role, status,
  first_name, last_name, phone
) VALUES (
  'admin@indra.edu.mn',
  'admin',
  '$2a$10$t4ENGK/vKyHl.wyMnIjQGu82Ou5wiP9rauGI83XMs4pp2w9LKbxi.',
  'SUPER_ADMIN',
  'ACTIVE',
  'Супер',
  'Админ',
  '+976 99999999'
) ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Сургалтын админ үүсгэх
INSERT INTO users (
  email, username, password, role, status,
  first_name, last_name, phone
) VALUES (
  'training@indra.edu.mn',
  'training_admin',
  '$2a$10$UtqX1iucp1NAuUGL1RxGVuPYIAUB.QnTavQpgi1/jLlX7uoRSPxfa',
  'TRAINING_ADMIN',
  'ACTIVE',
  'Сургалтын',
  'Админ',
  '+976 88888888'
) ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Санхүүгийн админ үүсгэх
INSERT INTO users (
  email, username, password, role, status,
  first_name, last_name, phone
) VALUES (
  'finance@indra.edu.mn',
  'finance_admin',
  '$2a$10$l40Fpkm1.NS.PC7C.dEB5udae0WqhUOowmh1yzt5Ld5Wgt8mL5tRC',
  'FINANCE_ADMIN',
  'ACTIVE',
  'Санхүүгийн',
  'Админ',
  '+976 77777777'
) ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Багш үүсгэх
INSERT INTO users (
  email, username, password, role, status,
  first_name, last_name, phone
) VALUES (
  'teacher@indra.edu.mn',
  'teacher1',
  '$2a$10$osUQRErlZ4Qx6G59xLUNsOh7S/MNcfKDtNyCVVl639vXMKyRduid.',
  'TEACHER',
  'ACTIVE',
  'Багш',
  'Ганбат',
  '+976 99001122'
) ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Оюутан үүсгэх
INSERT INTO users (
  email, username, password, role, status,
  first_name, last_name, phone
) VALUES (
  'student@indra.edu.mn',
  'student1',
  '$2a$10$bygM0Blf079skcKSBmE5fua0.8eTvfO6NfuaDmzUzraUC9/5knMpa',
  'STUDENT',
  'ACTIVE',
  'Оюутан',
  'Бат',
  '+976 99112233'
) ON CONFLICT (username) DO UPDATE SET
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  updated_at = NOW();

-- Үр дүнг шалгах
SELECT username, email, role, status, first_name, last_name 
FROM users 
ORDER BY created_at DESC;
