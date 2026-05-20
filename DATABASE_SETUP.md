# Indra Cyber School - Database Setup Guide

## 1. Supabase Database тохируулах

### Алхам 1: Supabase Dashboard руу нэвтрэх
1. [https://supabase.com](https://supabase.com) руу очих
2. Өөрийн project руу нэвтрэх

### Алхам 2: SQL Editor ашиглаад tables үүсгэх
1. Supabase Dashboard дээр **SQL Editor** руу очих
2. **New Query** дарах
3. `prisma/migrations/init.sql` файлын агуулгыг хуулаад SQL Editor-д буулгах
4. **Run** товч дарж бүх SQL commands ажиллуулах

### Алхам 3: Tables үүссэн эсэхийг шалгах
1. **Table Editor** руу очих
2. Дараах tables үүссэн эсэхийг шалгах:
   - users
   - admins
   - departments
   - majors
   - courses
   - teachers
   - students
   - classes
   - enrollments
   - attendance
   - grades
   - payments
   - salaries
   - assets
   - maintenance_records
   - system_settings
   - audit_logs

## 2. Environment Variables тохируулах

`.env.local` файлд дараах мэдээллийг оруулах:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres.xdywicnxzgtstrslhvcu:Turtemuulen@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xdywicnxzgtstrslhvcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Configuration
JWT_SECRET=indra-cyber-super-secret-jwt-key-2026-production
JWT_EXPIRES_IN=7d
```

## 3. Анхны админ хэрэглэгч

SQL script автоматаар анхны админ хэрэглэгч үүсгэнэ:

- **Username:** `admin`
- **Password:** `admin123`
- **Role:** SUPER_ADMIN

⚠️ **Анхааруулга:** Анхны нэвтрэлтийн дараа нууц үгээ заавал солих!

## 4. API Endpoints

### Authentication
- `POST /api/auth/login` - Нэвтрэх
- `POST /api/auth/register` - Бүртгүүлэх
- `GET /api/auth/me` - Хэрэглэгчийн мэдээлэл

### Students
- `GET /api/students` - Бүх оюутнууд
- `GET /api/students/[id]` - Нэг оюутан
- `POST /api/students` - Оюутан үүсгэх
- `PUT /api/students/[id]` - Оюутан шинэчлэх
- `DELETE /api/students/[id]` - Оюутан устгах

### Teachers
- `GET /api/teachers` - Бүх багш нар
- `POST /api/teachers` - Багш үүсгэх

### Payments
- `GET /api/payments` - Бүх төлбөрүүд
- `POST /api/payments` - Төлбөр үүсгэх

### Salaries
- `GET /api/salaries` - Бүх цалингууд
- `POST /api/salaries` - Цалин үүсгэх

## 5. Database Schema

### Users & Authentication
- `users` - Бүх хэрэглэгчид
- `admins` - Админууд

### Academic Management
- `departments` - Тэнхимүүд
- `majors` - Мэргэжлүүд
- `courses` - Хичээлүүд
- `classes` - Ангиуд
- `teachers` - Багш нар
- `students` - Оюутнууд
- `enrollments` - Элсэлтүүд

### Academic Records
- `attendance` - Ирц
- `grades` - Дүн

### Financial Management
- `payments` - Төлбөрүүд
- `salaries` - Цалингууд

### Asset Management
- `assets` - Эд хөрөнгө
- `maintenance_records` - Засварын бүртгэл

### System
- `system_settings` - Системийн тохиргоо
- `audit_logs` - Аудитын бүртгэл

## 6. Development Commands

```bash
# Dependencies суулгах
npm install

# Development server ажиллуулах
npm run dev

# Prisma Client үүсгэх
npx prisma generate

# Database schema харах
npx prisma studio
```

## 7. Testing API

### Login Test (Postman эсвэл curl)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 8. Troubleshooting

### Database холболтын алдаа
- `.env.local` файлд DATABASE_URL зөв эсэхийг шалгах
- Supabase project идэвхтэй эсэхийг шалгах
- Network холболт шалгах

### API алдаа
- Server ажиллаж байгаа эсэхийг шалгах (`npm run dev`)
- Browser console дээр алдааг шалгах
- Network tab дээр request/response харах

### Authentication алдаа
- JWT_SECRET тохируулагдсан эсэхийг шалгах
- Token хугацаа дууссан эсэхийг шалгах
- Authorization header зөв эсэхийг шалгах

## 9. Security Notes

⚠️ **Чухал:**
- `.env.local` файлыг Git-д commit хийхгүй байх
- Production дээр JWT_SECRET-ийг өөрчлөх
- Анхны админ нууц үгийг солих
- HTTPS ашиглах (production)
- Rate limiting нэмэх
- Input validation хийх

## 10. Next Steps

1. ✅ Database tables үүсгэх
2. ✅ API routes үүсгэх
3. 🔄 Frontend-ийг API-тай холбох
4. 🔄 Authentication flow хийх
5. 🔄 CRUD operations хийх
6. 🔄 File upload хийх
7. 🔄 Real-time updates (Supabase Realtime)
8. 🔄 Email notifications
9. 🔄 Reports & Analytics
10. 🔄 Testing & Deployment
