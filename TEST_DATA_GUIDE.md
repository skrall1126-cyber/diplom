# 📊 Test Data Guide - Туршилтын өгөгдөл оруулах

**Огноо**: 2026-05-20  
**Зорилго**: Database-д оюутан, багш, анги, хичээл зэрэг test өгөгдөл оруулах

---

## 🎯 Яагаад хэрэгтэй вэ?

Одоогоор database-д зөвхөн 5 админ хэрэглэгч байна:
- admin
- training_admin
- finance_admin
- teacher1
- student1

Гэхдээ **students**, **teachers**, **classes**, **courses** table-д өгөгдөл байхгүй.

API холбогдсон хуудсууд ажиллахын тулд test data хэрэгтэй!

---

## 📋 Оруулах өгөгдөл

### 1. Тэнхимүүд (4):
- Програм хангамжийн тэнхим
- Сүлжээний технологийн тэнхим
- Мэдээллийн аюулгүй байдлын тэнхим
- Мэдээлэл зүйн тэнхим

### 2. Мэргэжлүүд (4):
- Програм хангамж (PSW)
- Сүлжээний технологи (NET)
- Кибер аюулгүй байдал (CYB)
- Мэдээлэл зүй (IS)

### 3. Багш нар (3):
| Нэр | Username | Password | Тэнхим | Мэргэжил |
|-----|----------|----------|--------|----------|
| Б.Батбаяр | batbayar | teacher123 | Програм хангамж | JavaScript, React, Node.js |
| Ц.Энхтуяа | enkhtuya | teacher123 | Сүлжээ | Networking, Cisco, Security |
| Д.Батжаргал | batjargal_teacher | teacher123 | Аюулгүй байдал | Cybersecurity, Hacking |

### 4. Оюутнууд (5):
| Нэр | Username | Password | ID | Мэргэжил | GPA |
|-----|----------|----------|-------|----------|-----|
| Төртэмүүлэн | tortemuulen | student123 | B2026001 | Програм хангамж | 3.8 |
| Э.Батжаргал | e_batjargal | student123 | B2026002 | Програм хангамж | 3.5 |
| Ц.Мөнхбат | monkhbat | student123 | B2026003 | Сүлжээ | 3.2 |
| Д.Сүхбат | sukhbat | student123 | B2026004 | Аюулгүй байдал | 3.9 |
| Б.Ганбаяр | ganbayar | student123 | B2026005 | Мэдээлэл зүй | 3.6 |

### 5. Хичээлүүд (3):
- Програмчлалын үндэс (CS101)
- JavaScript (CS201)
- Сүлжээний үндэс (NET101)

---

## 🚀 Хэрхэн оруулах вэ?

### Арга 1: Supabase SQL Editor (Санал болгож байна)

1. **Supabase Dashboard нээх**
   ```
   https://supabase.com/dashboard
   ```

2. **Өөрийн project сонгох**

3. **SQL Editor руу орох**
   - Зүүн талын menu-с "SQL Editor" дарах
   - Эсвэл: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

4. **SQL script-ийг copy хийх**
   - Файл: `scripts/insert-test-data.sql`
   - Бүх агуулгыг copy хийх

5. **SQL Editor-д paste хийх**
   - "New query" дарах
   - Script-ийг paste хийх

6. **Run дарах**
   - "Run" эсвэл Ctrl+Enter дарах
   - Хүлээх (30 секунд орчим)

7. **Үр дүн шалгах**
   ```sql
   SELECT COUNT(*) FROM departments;  -- 4 байх ёстой
   SELECT COUNT(*) FROM majors;       -- 4 байх ёстой
   SELECT COUNT(*) FROM teachers;     -- 3 байх ёстой
   SELECT COUNT(*) FROM students;     -- 5 байх ёстой
   SELECT COUNT(*) FROM courses;      -- 3 байх ёстой
   ```

### Арга 2: Node.js Script

1. **Script ажиллуулах**
   ```bash
   cd indra-cyber-home/indra-home
   node scripts/run-test-data.js
   ```

2. **Үр дүн харах**
   - Console дээр прогресс харагдана
   - Амжилттай бол "✅ Test data insertion completed!" гэж харагдана

### Арга 3: psql Command Line

Хэрэв psql суулгасан бол:

```bash
psql YOUR_DATABASE_URL < scripts/insert-test-data.sql
```

---

## ✅ Амжилттай эсэхийг шалгах

### 1. Supabase Dashboard дээр шалгах

**Table Editor руу орох:**
- Departments: 4 мөр
- Majors: 4 мөр
- Teachers: 3 мөр
- Students: 5 мөр
- Courses: 3 мөр

### 2. Admin хуудсаар шалгах

**Нэвтрэх:**
```
URL: http://localhost:3001/admin/login
Username: admin
Password: admin123
```

**Хуудсууд шалгах:**
- Students: http://localhost:3001/admin/students
  - 5 оюутан харагдах ёстой
  
- Teachers: http://localhost:3001/admin/teachers
  - 3 багш харагдах ёстой
  
- Training Management: http://localhost:3001/admin/training-management
  - 4 мэргэжил, 3 хичээл харагдах ёстой

### 3. API-аар шалгах

**Browser Console дээр:**
```javascript
// Students
fetch('http://localhost:3001/api/students', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
.then(r => r.json())
.then(d => console.log('Students:', d.students.length));

// Teachers
fetch('http://localhost:3001/api/teachers', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
.then(r => r.json())
.then(d => console.log('Teachers:', d.teachers.length));
```

---

## 🔧 Алдаа гарвал

### Алдаа 1: "relation does not exist"

**Шалтгаан**: Table үүсээгүй байна

**Шийдэл**: 
1. Database migration ажиллуулах
2. Эсвэл schema manually үүсгэх

### Алдаа 2: "duplicate key value"

**Шалтгаан**: Өгөгдөл аль хэдийн байна

**Шийдэл**: 
```sql
-- Хуучин өгөгдөл устгах (АНХААР: Бүх өгөгдөл устана!)
DELETE FROM students;
DELETE FROM teachers;
DELETE FROM courses;
DELETE FROM majors;
DELETE FROM departments;

-- Дараа нь дахин script ажиллуулах
```

### Алдаа 3: "permission denied"

**Шалтгаан**: Service role key буруу эсвэл эрх хүрэхгүй

**Шийдэл**:
1. `.env.local` файлд `SUPABASE_SERVICE_ROLE_KEY` зөв эсэхийг шалгах
2. Supabase Dashboard-с service_role key дахин авах

---

## 📊 Өгөгдлийн бүтэц

### Students Table
```typescript
{
  id: UUID,
  user_id: UUID,
  student_id: string,      // "B2026001"
  major_id: UUID,
  enrollment_date: date,
  current_semester: number,
  gpa: number,
  total_credits: number,
  tuition_fee: number,
  paid_amount: number,
  remaining_amount: number,
  user: {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'GRADUATED'
  },
  major: {
    name: string,
    code: string
  }
}
```

### Teachers Table
```typescript
{
  id: UUID,
  user_id: UUID,
  teacher_id: string,      // "T2026001"
  department_id: UUID,
  position: string,
  specialization: string[],
  hire_date: date,
  salary: number,
  max_hours_per_week: number,
  user: {
    first_name: string,
    last_name: string,
    email: string,
    phone: string
  },
  department: {
    name: string,
    code: string
  }
}
```

---

## 🎯 Дараагийн алхам

Test data амжилттай оруулсны дараа:

1. ✅ Admin хуудсууд шалгах
2. ✅ API endpoints тестлэх
3. ✅ CRUD функцууд нэмэх
4. ✅ Бусад хуудсуудыг холбох

---

## 📞 Тусламж

Хэрэв асуудал гарвал:

1. **Console logs шалгах** (F12 → Console)
2. **Network tab шалгах** (F12 → Network)
3. **Supabase logs шалгах** (Dashboard → Logs)
4. **SQL Editor дээр manual шалгах**

---

## 🎊 Амжилт хүсье!

Test data оруулсны дараа админы систем бүрэн ажиллахад бэлэн болно! 🚀

**Файлууд**:
- `scripts/insert-test-data.sql` - SQL script
- `scripts/run-test-data.js` - Node.js runner
- `TEST_DATA_GUIDE.md` - Энэ гарын авлага
