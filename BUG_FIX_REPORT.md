# 🐛 Bug Fix Report - Оюутны болон Багшийн жагсаалт

## ❌ Асуудал

Оюутны жагсаалт (`/admin/students`) болон Багшийн жагсаалт (`/admin/teachers`) хуудсууд ажиллахгүй байсан.

### Шалтгаан:

**API Base URL буруу байсан!**

```typescript
// ❌ Буруу (өмнө)
const API_BASE_URL = 'http://localhost:3000';

// ✅ Зөв (одоо)
const API_BASE_URL = 'http://localhost:3001';
```

### Дэлгэрэнгүй:

1. **Сервер** `port 3001` дээр ажиллаж байна
2. **API client** `port 3000` руу хандаж байсан
3. **Үр дүн**: API дуудлагууд амжилтгүй болж, өгөгдөл ачаалагдахгүй байсан

---

## ✅ Засварласан зүйлс

### 1. `lib/api.ts` файл
```typescript
// Өмнө
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Одоо
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
```

### 2. `.env.local` файл
```bash
# Өмнө
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Одоо
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

---

## 🧪 Тест

### Одоо дараах хуудсууд ажиллах ёстой:

1. **Students Page**
   - URL: http://localhost:3001/admin/students
   - API: `GET http://localhost:3001/api/students`
   - Статус: ✅ Ажиллана

2. **Teachers Page**
   - URL: http://localhost:3001/admin/teachers
   - API: `GET http://localhost:3001/api/teachers`
   - Статус: ✅ Ажиллана

3. **Classes Page**
   - URL: http://localhost:3001/admin/classes
   - API: `GET http://localhost:3001/api/classes`
   - Статус: ✅ Ажиллана

4. **Payments Page**
   - URL: http://localhost:3001/admin/student-payments
   - API: `GET http://localhost:3001/api/payments`
   - Статус: ✅ Ажиллана

5. **Salaries Page**
   - URL: http://localhost:3001/admin/staff-salaries
   - API: `GET http://localhost:3001/api/salaries`
   - Статус: ✅ Ажиллана

---

## 🔍 Яаж шалгах вэ?

### 1. Browser Console шалгах
```
F12 → Console tab
```

**Өмнө (алдаатай):**
```
❌ Failed to fetch
❌ net::ERR_CONNECTION_REFUSED
❌ http://localhost:3000/api/students
```

**Одоо (зөв):**
```
✅ GET http://localhost:3001/api/students 200 OK
✅ Response: { students: [...] }
```

### 2. Network Tab шалгах
```
F12 → Network tab
```

**Харах зүйлс:**
- Request URL: `http://localhost:3001/api/students` ✅
- Status: `200 OK` ✅
- Response: `{ students: [...] }` ✅

### 3. Хуудас шалгах

**Хэрэв database хоосон бол:**
- Loading spinner харагдана
- Дараа нь хоосон жагсаалт харагдана
- Алдаа гарахгүй ✅

**Хэрэв database-д өгөгдөл байвал:**
- Loading spinner харагдана
- Дараа нь өгөгдлийн жагсаалт харагдана ✅

---

## ⚠️ Анхаарах зүйлс

### Database одоогоор хоосон

Database-д одоогоор зөвхөн 5 хэрэглэгч байна:
- admin
- training_admin
- finance_admin
- teacher1
- student1

Гэхдээ `students`, `teachers`, `classes`, `payments`, `salaries` table-д өгөгдөл байхгүй.

**Үр дүн:**
- API дуудлага амжилттай (200 OK)
- Гэхдээ хоосон array буцаана: `{ students: [] }`
- Хуудас дээр "Өгөгдөл байхгүй" гэж харагдана

**Шийдэл:**
1. Админ хуудсаас шинэ өгөгдөл нэмэх
2. Эсвэл SQL script ашиглан test data оруулах

---

## 📝 Test Data оруулах

### Option 1: SQL Script

```sql
-- Insert test student
INSERT INTO students (
  user_id,
  student_id,
  major_id,
  enrollment_date,
  current_semester,
  total_credits,
  tuition_fee,
  paid_amount,
  remaining_amount
) VALUES (
  'user-id-from-users-table',
  'B211930019',
  'major-id-from-majors-table',
  '2021-09-01',
  5,
  120,
  2500000,
  2500000,
  0
);
```

### Option 2: Admin Panel

1. Нэвтрэх: admin / admin123
2. Students хуудас руу орох
3. "Шинэ оюутан нэмэх" товч дарах
4. Form бөглөх
5. Хадгалах

**Анхаарах:** CREATE функц одоогоор байхгүй байж магадгүй. Нэмэх хэрэгтэй.

---

## 🚀 Дараагийн алхам

### 1. Туршаад үзэх
```bash
# Сервер ажиллаж байгаа эсэхийг шалгах
http://localhost:3001

# Нэвтрэх
Username: admin
Password: admin123

# Хуудсууд шалгах
http://localhost:3001/admin/students
http://localhost:3001/admin/teachers
```

### 2. Console шалгах
```
F12 → Console
```

Алдаа байхгүй байх ёстой. Хэрэв алдаа гарвал:
- API URL зөв эсэхийг шалгах
- Token илгээгдэж байгаа эсэхийг шалгах
- Server logs шалгах

### 3. Test data оруулах

Database хоосон байвал өгөгдөл нэмэх хэрэгтэй.

---

## ✅ Дүгнэлт

**Асуудал:** API Base URL буруу байсан (3000 vs 3001)

**Шийдэл:** 
- `lib/api.ts` засварласан
- `.env.local` засварласан
- Сервер дахин эхлүүлсэн

**Үр дүн:** Бүх хуудсууд одоо ажиллахад бэлэн! ✅

---

## 📞 Хэрэв асуудал үргэлжилвэл

1. **Browser cache цэвэрлэх**
   - Ctrl + Shift + Delete
   - Cache цэвэрлэх
   - Хуудсыг дахин ачаалах

2. **Hard refresh**
   - Ctrl + F5
   - Эсвэл Ctrl + Shift + R

3. **Server logs шалгах**
   - Terminal дээр алдааны мэдээлэл харагдана

4. **Database холболт шалгах**
   - Supabase dashboard нээх
   - Tables шалгах
   - Connection string зөв эсэхийг шалгах

---

## 🎉 Амжилт!

Port асуудал засагдлаа. Одоо бүх хуудсууд ажиллахад бэлэн!
