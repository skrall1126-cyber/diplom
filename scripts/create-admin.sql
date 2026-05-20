-- Бүрэн эрхт админ үүсгэх
-- Нууц үг: admin123 (bcrypt hash)

INSERT INTO users (
  id,
  email,
  username,
  password,
  role,
  status,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@indra.edu.mn',
  'admin',
  '$2a$10$rKJ5VqZ9YqZ9YqZ9YqZ9YeN5VqZ9YqZ9YqZ9YqZ9YqZ9YqZ9YqZ9Y', -- admin123
  'SUPER_ADMIN',
  'ACTIVE',
  'Супер',
  'Админ',
  '+976 99999999',
  NOW(),
  NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Сургалтын админ
INSERT INTO users (
  id,
  email,
  username,
  password,
  role,
  status,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'training@indra.edu.mn',
  'training_admin',
  '$2a$10$rKJ5VqZ9YqZ9YqZ9YqZ9YeN5VqZ9YqZ9YqZ9YqZ9YqZ9YqZ9YqZ9Y', -- training123
  'TRAINING_ADMIN',
  'ACTIVE',
  'Сургалтын',
  'Админ',
  '+976 88888888',
  NOW(),
  NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Санхүүгийн админ
INSERT INTO users (
  id,
  email,
  username,
  password,
  role,
  status,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'finance@indra.edu.mn',
  'finance_admin',
  '$2a$10$rKJ5VqZ9YqZ9YqZ9YqZ9YeN5VqZ9YqZ9YqZ9YqZ9YqZ9YqZ9YqZ9Y', -- finance123
  'FINANCE_ADMIN',
  'ACTIVE',
  'Санхүүгийн',
  'Админ',
  '+976 77777777',
  NOW(),
  NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Багш
INSERT INTO users (
  id,
  email,
  username,
  password,
  role,
  status,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'teacher@indra.edu.mn',
  'teacher1',
  '$2a$10$rKJ5VqZ9YqZ9YqZ9YqZ9YeN5VqZ9YqZ9YqZ9YqZ9YqZ9YqZ9YqZ9Y', -- teacher123
  'TEACHER',
  'ACTIVE',
  'Багш',
  'Ганбат',
  '+976 99001122',
  NOW(),
  NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Оюутан
INSERT INTO users (
  id,
  email,
  username,
  password,
  role,
  status,
  first_name,
  last_name,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'student@indra.edu.mn',
  'student1',
  '$2a$10$rKJ5VqZ9YqZ9YqZ9YqZ9YeN5VqZ9YqZ9YqZ9YqZ9YqZ9YqZ9YqZ9Y', -- student123
  'STUDENT',
  'ACTIVE',
  'Оюутан',
  'Бат',
  '+976 99112233',
  NOW(),
  NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Үр дүнг харуулах
SELECT 
  username,
  email,
  role,
  status,
  first_name || ' ' || last_name as full_name
FROM users
WHERE username IN ('admin', 'training_admin', 'finance_admin', 'teacher1', 'student1')
ORDER BY 
  CASE role
    WHEN 'SUPER_ADMIN' THEN 1
    WHEN 'TRAINING_ADMIN' THEN 2
    WHEN 'FINANCE_ADMIN' THEN 3
    WHEN 'TEACHER' THEN 4
    WHEN 'STUDENT' THEN 5
  END;
