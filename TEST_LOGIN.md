# Нэвтрэх системийн тест

## Серверийн мэдээлэл
- **URL**: http://localhost:3001
- **Админы нэвтрэх хуудас**: http://localhost:3001/admin/login

## Нэвтрэх мэдээлэл

### 1. Бүрэн эрхт админ (SUPER_ADMIN)
- **Хэрэглэгчийн нэр**: `admin`
- **Нууц үг**: `admin123`
- **Redirect**: `/admin/dashboard`

### 2. Сургалтын албаны админ (TRAINING_ADMIN)
- **Хэрэглэгчийн нэр**: `training_admin`
- **Нууц үг**: `training123`
- **Redirect**: `/admin/training-dashboard`

### 3. Санхүүгийн албаны админ (FINANCE_ADMIN)
- **Хэрэглэгчийн нэр**: `finance_admin`
- **Нууц үг**: `finance123`
- **Redirect**: `/admin/finance-dashboard`

### 4. Багш (TEACHER)
- **Хэрэглэгчийн нэр**: `teacher1`
- **Нууц үг**: `teacher123`

### 5. Оюутан (STUDENT)
- **Хэрэглэгчийн нэр**: `student1`
- **Нууц үг**: `student123`

## Нэвтрэх алхамууд

1. Вэб хөтөч дээр `http://localhost:3001/admin/login` хаягруу орно
2. Админы төрлөө сонгоно (Бүрэн эрхт админ, Сургалтын албаны админ, эсвэл Санхүүгийн албаны админ)
3. ID болон нууц үгээ оруулна
4. "Нэвтрэх" товчийг дарна
5. Амжилттай нэвтэрсэн бол dashboard руу шилжинэ

## Системийн төлөв

✅ **Серверийн төлөв**: Ажиллаж байна (port 3001)
✅ **Database**: Supabase холбогдсон
✅ **Хэрэглэгчид**: 5 хэрэглэгч үүсгэгдсэн
✅ **Authentication**: JWT token ашиглан
✅ **LocalStorage**: Token болон хэрэглэгчийн мэдээлэл хадгалагдана

## Алдаа гарвал

Хэрэв нэвтрэх үед алдаа гарвал:

1. Browser console-г нээж алдааны мэдээллийг харна (F12 дарж Console tab)
2. Network tab-г нээж `/api/auth/login` request-ийн response-г харна
3. LocalStorage-г шалгана (Application tab → Local Storage → http://localhost:3001)

## Одоогийн тохиргоо

- **JWT Secret**: indra-cyber-super-secret-jwt-key-2026-production
- **JWT Expires**: 7 хоног
- **Password Hash**: bcrypt (10 rounds)
- **Database**: Supabase PostgreSQL
