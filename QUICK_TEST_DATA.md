# ⚡ Хурдан Test Data Оруулах

**Файл**: `scripts/insert-simple-test-data.sql`

---

## 🚀 Хэрхэн ашиглах

### 1. Supabase SQL Editor нээх
```
https://supabase.com/dashboard/project/YOUR_PROJECT/sql
```

### 2. Script copy хийх
- Файл нээх: `scripts/insert-simple-test-data.sql`
- Бүх агуулгыг copy хийх (Ctrl+A, Ctrl+C)

### 3. SQL Editor-д paste хийх
- "New query" дарах
- Paste хийх (Ctrl+V)
- "Run" дарах (эсвэл Ctrl+Enter)

### 4. Хүлээх
- 10-20 секунд хүлээх
- Амжилттай бол доод талд үр дүн харагдана

---

## ✅ Оруулагдах өгөгдөл

- **4 тэнхим**: SW, NET, SEC, IS
- **4 мэргэжил**: PSW, NET, CYB, IS
- **3 багш**: batbayar, enkhtuya, batjargal_teacher
- **5 оюутан**: tortemuulen, e_batjargal, monkhbat, sukhbat, ganbayar
- **3 хичээл**: CS101, CS201, NET101

---

## 🔍 Шалгах

SQL Editor дээр дараах query-г ажиллуулах:

```sql
SELECT COUNT(*) FROM departments;  -- 4
SELECT COUNT(*) FROM majors;       -- 4
SELECT COUNT(*) FROM teachers;     -- 3
SELECT COUNT(*) FROM students;     -- 5
SELECT COUNT(*) FROM courses;      -- 3
```

Эсвэл админ хуудсаар:
- http://localhost:3001/admin/students (5 оюутан)
- http://localhost:3001/admin/teachers (3 багш)

---

## ⚠️ Анхаар

Хэрэв алдаа гарвал:
1. Алдааны мэдээллийг уншаад үзэх
2. Table schema шалгах
3. Эсвэл надтай хуваалцах

---

## 🎯 Амжилт!

Test data оруулсны дараа админы систем бүрэн ажиллахад бэлэн болно! 🚀
