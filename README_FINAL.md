# 🎓 Indra Cyber Home - Админы Систем

**Төсөл**: Индра коллежийн удирдлагын систем  
**Огноо**: 2026-05-20  
**Статус**: ✅ Ажиллахад бэлэн (16.7% API холбогдсон)

---

## 🚀 Хурдан эхлүүлэх

### 1. Dependencies суулгах
```bash
cd indra-cyber-home/indra-home
npm install
```

### 2. Environment тохируулах
`.env.local` файлд дараах мэдээллийг оруулах:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Test data оруулах
**Supabase SQL Editor:**
1. https://supabase.com/dashboard нээх
2. SQL Editor руу орох
3. `scripts/insert-simple-test-data.sql` файлын агуулгыг copy хийх
4. Paste хийж Run дарах

### 4. Сервер эхлүүлэх
```bash
npm run dev
```

Сервер: http://localhost:3001

---

## 🔐 Нэвтрэх

### Admin хэрэглэгчид:

| Username | Password | Роль | Хандах эрх |
|----------|----------|------|------------|
| admin | admin123 | SUPER_ADMIN | Бүх хуудас |
| training_admin | training123 | TRAINING_ADMIN | Сургалтын хуудсууд |
| finance_admin | finance123 | FINANCE_ADMIN | Санхүүгийн хуудсууд |

### Test хэрэглэгчид:

**Багш нар:**
- batbayar / teacher123
- enkhtuya / teacher123
- batjargal_teacher / teacher123

**Оюутнууд:**
- tortemuulen / student123
- e_batjargal / student123
- monkhbat / student123
- sukhbat / student123
- ganbayar / student123

---

## 📊 Хуудсууд

### ✅ API холбогдсон (10):

1. **Students** - `/admin/students`
   - Оюутнуудын жагсаалт
   - Хайлт, шүүлт
   - Дэлгэрэнгүй мэдээлэл

2. **Teachers** - `/admin/teachers`
   - Багш нарын жагсаалт
   - Мэргэжил, тэнхим

3. **Classes** - `/admin/classes`
   - Ангиудын жагсаалт
   - Оюутан, багш холбох

4. **Student Payments** - `/admin/student-payments`
   - Төлбөрийн мэдээлэл
   - Төлбөрийн түүх

5. **Staff Salaries** - `/admin/staff-salaries`
   - Цалингийн мэдээлэл
   - Багш нарын цалин

6. **Training Management** - `/admin/training-management`
   - Мэргэжил, хичээлийн удирдлага
   - Сургалтын төлөвлөгөө

7. **Profile** - `/admin/profile`
   - Хувийн мэдээлэл
   - Тохиргоо

8. **Departments & Branches** - `/admin/departments-branches`
   - Тэнхимүүд
   - Салбар сургуулиуд

9. **Finance Dashboard** - `/admin/finance-dashboard`
   - Санхүүгийн тойм
   - Орлого, зарлага

10. **Training Dashboard** - `/admin/training-dashboard`
    - Сургалтын тойм
    - Оюутан, анги, хичээл

### ⏳ Үлдсэн (50):
- Dashboard (Main)
- Attendance
- Grades
- Exam Schedule
- Timetable
- Settings
- Бусад 44 хуудас...

---

## 🛠️ Технологи

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT, Cookie-based
- **Styling**: Tailwind CSS

---

## 📁 Файлын бүтэц

```
indra-cyber-home/indra-home/
├── app/
│   ├── admin/              # Админы хуудсууд
│   │   ├── students/       # ✅ API холбогдсон
│   │   ├── teachers/       # ✅ API холбогдсон
│   │   ├── classes/        # ✅ API холбогдсон
│   │   └── ...
│   └── api/                # API routes
│       ├── auth/           # Authentication
│       ├── students/       # Students API
│       ├── teachers/       # Teachers API
│       └── ...
├── components/             # React components
├── contexts/               # React contexts
├── lib/
│   ├── api.ts             # ✅ API client
│   ├── auth.ts            # Authentication
│   └── db.ts              # Database
├── scripts/
│   ├── insert-simple-test-data.sql  # ✅ Test data
│   ├── generate-hash.js             # Password hash
│   └── check-users.js               # User verification
└── ...
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Нэвтрэх
- `POST /api/auth/logout` - Гарах
- `GET /api/auth/me` - Хэрэглэгчийн мэдээлэл
- `POST /api/auth/refresh` - Token refresh

### Students
- `GET /api/students` - Бүх оюутан
- `GET /api/students/:id` - Нэг оюутан
- `POST /api/students` - Оюутан нэмэх
- `PUT /api/students/:id` - Оюутан засах
- `DELETE /api/students/:id` - Оюутан устгах

### Teachers
- `GET /api/teachers` - Бүх багш
- `POST /api/teachers` - Багш нэмэх

### Classes
- `GET /api/classes` - Бүх анги
- `POST /api/classes` - Анги нэмэх

### Payments
- `GET /api/payments` - Бүх төлбөр
- `POST /api/payments` - Төлбөр нэмэх

### Salaries
- `GET /api/salaries` - Бүх цалин
- `POST /api/salaries` - Цалин нэмэх

---

## 📚 Гарын авлагууд

- `FINAL_SUMMARY.md` - Ерөнхий тайлан
- `API_INTEGRATION_FINAL_STATUS.md` - API статус
- `TEST_DATA_GUIDE.md` - Test data гарын авлага
- `QUICK_TEST_DATA.md` - Хурдан гарын авлага
- `BUG_FIX_STUDENTS_PAGE.md` - Bug fix тайлан

---

## ⚠️ Анхаарах зүйлс

### 1. Port
- Сервер **port 3001** дээр ажиллана
- `.env.local` дээр `NEXT_PUBLIC_APP_URL=http://localhost:3001`

### 2. Database
- Test data оруулах хэрэгтэй
- Эсвэл хуудсууд хоосон харагдана

### 3. Authentication
- Cookie-based authentication ашиглана
- Token автоматаар refresh хийгдэнэ

---

## 🐛 Алдаа засах

### Алдаа 1: "Invalid API key"
**Шийдэл**: `.env.local` дээр `SUPABASE_SERVICE_ROLE_KEY` шалгах

### Алдаа 2: "studentsData is not defined"
**Шийдэл**: ✅ Засагдсан

### Алдаа 3: Port 3000 vs 3001
**Шийдэл**: ✅ Засагдсан

### Алдаа 4: Database хоосон
**Шийдэл**: Test data оруулах (`scripts/insert-simple-test-data.sql`)

---

## 🎯 Дараагийн алхам

1. ✅ Test data оруулах
2. ⏳ Үлдсэн 50 хуудас API холбох
3. ⏳ CRUD функцууд нэмэх (CREATE, UPDATE, DELETE)
4. ⏳ Render хэсгүүдийг API бүтэцэд тохируулах
5. ⏳ Шинэ API endpoints үүсгэх (attendance, grades, exams, etc.)

---

## 📞 Тусламж

Хэрэв асуудал гарвал:
1. Console logs шалгах (F12 → Console)
2. Network tab шалгах (F12 → Network)
3. Supabase logs шалгах
4. Гарын авлагууд уншаад үзэх

---

## 🎊 Амжилт хүсье!

Админы систем одоо 16.7% бэлэн боллоо! Үргэлжлүүлье! 🚀

**Хөгжүүлэгч**: Kiro AI  
**Огноо**: 2026-05-20
