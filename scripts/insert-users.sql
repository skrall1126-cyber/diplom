-- ============================================
-- ХЭРЭГЛЭГЧДИЙГ НЭМЭХ SQL
-- ============================================
-- Энэ SQL-ийг Supabase SQL Editor дээр ажиллуулна уу
-- https://supabase.com/dashboard/project/xdywicnxzgtstrslhvcu/sql

-- 1. СУПЕР АДМИН (Бүрэн эрхтэй)
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'admin@indra.edu.mn',
  'admin',
  '$2a$10$t4ENGK/vKyHl.wyMnIjQGu82Ou5wiP9rauGI83XMs4pp2w9LKbxi.',
  'SUPER_ADMIN',
  'ACTIVE',
  'Супер',
  'Админ',
  '+976 99999999',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- 2. СУРГАЛТЫН АЛБАНЫ АДМИН
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'training@indra.edu.mn',
  'training_admin',
  '$2a$10$UtqX1iucp1NAuUGL1RxGVuPYIAUB.QnTavQpgi1/jLlX7uoRSPxfa',
  'TRAINING_ADMIN',
  'ACTIVE',
  'Сургалтын',
  'Админ',
  '+976 88888888',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- 3. САНХҮҮГИЙН АЛБАНЫ АДМИН
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'finance@indra.edu.mn',
  'finance_admin',
  '$2a$10$l40Fpkm1.NS.PC7C.dEB5udae0WqhUOowmh1yzt5Ld5Wgt8mL5tRC',
  'FINANCE_ADMIN',
  'ACTIVE',
  'Санхүүгийн',
  'Админ',
  '+976 77777777',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- 4. БАГШ
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'teacher@indra.edu.mn',
  'teacher1',
  '$2a$10$osUQRErlZ4Qx6G59xLUNsOh7S/MNcfKDtNyCVVl639vXMKyRduid.',
  'TEACHER',
  'ACTIVE',
  'Багш',
  'Ганбат',
  '+976 99001122',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- 5. ОЮУТАН
INSERT INTO users (
  id, email, username, password, role, status,
  first_name, last_name, phone, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'student@indra.edu.mn',
  'student1',
  '$2a$10$bygM0Blf079skcKSBmE5fua0.8eTvfO6NfuaDmzUzraUC9/5knMpa',
  'STUDENT',
  'ACTIVE',
  'Оюутан',
  'Бат',
  '+976 99112233',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- ============================================
-- НЭВТРЭХ МЭДЭЭЛЭЛ
-- ============================================
-- Супер админ:        admin / admin123
-- Сургалтын админ:    training_admin / training123
-- Санхүүгийн админ:   finance_admin / finance123
-- Багш:               teacher1 / teacher123
-- Оюутан:             student1 / student123
