# API Integration - Практик жишээ

## Одоогийн байдал

Админы хуудсууд одоо **mock data** ашиглаж байна:

```typescript
// ❌ Mock data - устгах хэрэгтэй
const studentsData = [
  { id: 1, name: "Төртэмүүлэн", ... },
  { id: 2, name: "Э.Батжаргал", ... },
];
```

## Шинэ байдал - API ашиглах

### 1. Import нэмэх

```typescript
import { studentsApi } from '@/lib/api';
```

### 2. State өөрчлөх

```typescript
// Өмнө
const studentsData = [...];

// Одоо
const [students, setStudents] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### 3. useEffect нэмэх

```typescript
useEffect(() => {
  loadStudents();
}, []);

const loadStudents = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const result = await studentsApi.getAll();
    
    if (result.error) {
      setError(result.error);
      return;
    }
    
    if (result.data) {
      setStudents(result.data.students);
    }
  } catch (err: any) {
    setError(err.message || 'Алдаа гарлаа');
  } finally {
    setLoading(false);
  }
};
```

### 4. Render-д өөрчлөлт

```typescript
// Өмнө
{studentsData.map(student => ...)}

// Одоо
{students.map(student => ...)}
```

### 5. CRUD функцууд

```typescript
// CREATE
const handleAddStudent = async (data: any) => {
  const result = await studentsApi.create(data);
  if (!result.error) {
    await loadStudents(); // Refresh
    alert('Амжилттай!');
  }
};

// UPDATE
const handleUpdateStudent = async (id: string, data: any) => {
  const result = await studentsApi.update(id, data);
  if (!result.error) {
    await loadStudents(); // Refresh
    alert('Амжилттай!');
  }
};

// DELETE
const handleDeleteStudent = async (id: string) => {
  if (!confirm('Устгах уу?')) return;
  const result = await studentsApi.delete(id);
  if (!result.error) {
    await loadStudents(); // Refresh
    alert('Амжилттай!');
  }
};
```

## Бүрэн жишээ - Classes Page

Энэ нь checkbox асуудлыг шийдсэн хуудас. Одоо API-тай холбоё:

### Өмнө:
```typescript
const allStudents = [
  { id: 1, name: "Л.Лхагва", code: "B211930010", ... },
  ...
];
```

### Одоо:
```typescript
const [allStudents, setAllStudents] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadStudents();
}, []);

const loadStudents = async () => {
  try {
    setLoading(true);
    const result = await studentsApi.getAll({ status: 'ACTIVE' });
    
    if (result.data) {
      setAllStudents(result.data.students);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

## Хуудас бүрийн холболт

### Students Page
```typescript
import { studentsApi } from '@/lib/api';

// GET all
const result = await studentsApi.getAll();

// GET with filters
const result = await studentsApi.getAll({ 
  major_id: 'xxx', 
  class_id: 'yyy',
  status: 'ACTIVE' 
});

// CREATE
const result = await studentsApi.create({
  email: 'student@example.com',
  username: 'student123',
  password: 'password',
  role: 'STUDENT',
  first_name: 'Төртэмүүлэн',
  last_name: 'Б',
  phone: '99999999',
  student_id: 'B211930019',
  major_id: 'major-id',
  enrollment_date: '2021-09-01',
  current_semester: 1,
  total_credits: 0,
  tuition_fee: 2500000,
  paid_amount: 0,
  remaining_amount: 2500000
});

// UPDATE
const result = await studentsApi.update('student-id', {
  first_name: 'Шинэ нэр',
  phone: '88888888'
});

// DELETE
const result = await studentsApi.delete('student-id');
```

### Teachers Page
```typescript
import { teachersApi } from '@/lib/api';

// GET all
const result = await teachersApi.getAll();

// GET with filter
const result = await teachersApi.getAll({ 
  department_id: 'dept-id' 
});

// CREATE
const result = await teachersApi.create({
  email: 'teacher@example.com',
  username: 'teacher1',
  password: 'password',
  role: 'TEACHER',
  first_name: 'Багш',
  last_name: 'А',
  phone: '99999999',
  teacher_id: 'T001',
  department_id: 'dept-id',
  position: 'Багш',
  specialization: ['Програм хангамж'],
  hire_date: '2020-01-01',
  salary: 1500000,
  max_hours_per_week: 40
});
```

### Classes Page
```typescript
import { classesApi } from '@/lib/api';

// GET all
const result = await classesApi.getAll();

// GET with filter
const result = await classesApi.getAll({ 
  major_id: 'major-id' 
});

// CREATE
const result = await classesApi.create({
  name: 'Програм хангамж 1-р анги',
  code: 'CS-101',
  course_id: 'course-id',
  teacher_id: 'teacher-id',
  semester: '2024-1',
  status: 'ONGOING',
  start_date: '2024-09-01',
  end_date: '2025-01-15',
  max_students: 30,
  room: 'A-101',
  schedule: { monday: '09:00-11:00', wednesday: '09:00-11:00' }
});
```

### Payments Page
```typescript
import { paymentsApi } from '@/lib/api';

// GET all
const result = await paymentsApi.getAll();

// GET with filters
const result = await paymentsApi.getAll({ 
  status: 'PAID',
  semester: '2024-1' 
});

// CREATE
const result = await paymentsApi.create({
  student_id: 'student-id',
  amount: 2500000,
  payment_method: 'BANK_TRANSFER',
  status: 'PAID',
  due_date: '2024-09-01',
  paid_date: '2024-08-25',
  semester: '2024-1',
  academic_year: '2024-2025',
  description: 'Улирлын төлбөр',
  receipt_number: 'RCP-001'
});
```

### Salaries Page
```typescript
import { salariesApi } from '@/lib/api';

// GET all
const result = await salariesApi.getAll();

// GET with filters
const result = await salariesApi.getAll({ 
  status: 'PAID',
  month: '2024-05' 
});

// CREATE
const result = await salariesApi.create({
  teacher_id: 'teacher-id',
  base_salary: 1500000,
  bonus: 200000,
  deductions: 50000,
  net_salary: 1650000,
  month: '2024-05',
  payment_date: '2024-05-05',
  status: 'PAID',
  teaching_hours: 160,
  overtime_hours: 10,
  bonus_reason: 'Гүйцэтгэлийн урамшуулал'
});
```

## Алдаа засах (Debugging)

### 1. Browser Console
```javascript
// F12 дарж Console tab нээх
// Алдааны мэдээлэл харагдана
```

### 2. Network Tab
```javascript
// F12 дарж Network tab нээх
// API дуудлагууд харагдана
// Status code шалгах (200 = амжилттай, 401 = нэвтрээгүй, 403 = эрхгүй, 500 = серверийн алдаа)
```

### 3. Server Logs
```bash
# Terminal дээр server logs харагдана
# Алдааны дэлгэрэнгүй мэдээлэл
```

## Анхаарах зүйлс

1. **Token автоматаар илгээгдэнэ** - `lib/api.ts`-д тохируулсан
2. **Error handling** - Бүх API дуудлага `try-catch` дотор байх ёстой
3. **Loading state** - Өгөгдөл ачаалж байх үед spinner харуулах
4. **Refresh** - CRUD үйлдэл хийсний дараа жагсаалтыг дахин ачаалах
5. **Validation** - Form өгөгдлийг илгээхээс өмнө шалгах

## Дараагийн алхам

Одоо та дараах хуудсуудыг API-тай холбож болно:

1. ✅ `/admin/students` - Students API
2. ✅ `/admin/teachers` - Teachers API
3. ✅ `/admin/classes` - Classes API
4. ✅ `/admin/student-payments` - Payments API
5. ✅ `/admin/staff-salaries` - Salaries API
6. ⏳ Бусад хуудсууд...

Энэ гарын авлагыг ашиглан бүх хуудсыг API-тай холбож болно!
