# Quick API Integration - Бүх хуудсууд

Энэ файл нь бүх админы хуудсуудыг API-тай хурдан холбох код агуулна.

## ✅ Хийгдсэн:
1. Students Page - API холбогдсон
2. Teachers Page - API холбогдсон

## 🔄 Одоо хийх:

### 3. Classes Page
### 4. Payments Page  
### 5. Salaries Page
### 6. Бусад хуудсууд

---

## Classes Page - Бүрэн код

Файл: `app/admin/classes/page.tsx`

**Эхний хэсэгт нэмэх:**

```typescript
import { classesApi, studentsApi } from '@/lib/api';

// State нэмэх
const [classes, setClasses] = useState<any[]>([]);
const [allStudents, setAllStudents] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Load functions
useEffect(() => {
  loadClasses();
  loadStudents();
}, []);

const loadClasses = async () => {
  try {
    const result = await classesApi.getAll();
    if (result.data) {
      setClasses(result.data.classes || []);
    }
  } catch (err) {
    console.error(err);
  }
};

const loadStudents = async () => {
  try {
    setLoading(true);
    const result = await studentsApi.getAll({ status: 'ACTIVE' });
    if (result.data) {
      setAllStudents(result.data.students || []);
    }
  } catch (err) {
    setError('Өгөгдөл ачаалахад алдаа гарлаа');
  } finally {
    setLoading(false);
  }
};
```

---

## Payments Page - Бүрэн код

Файл: `app/admin/student-payments/page.tsx`

**Эхний хэсэгт нэмэх:**

```typescript
import { paymentsApi } from '@/lib/api';

// State нэмэх
const [payments, setPayments] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Load function
useEffect(() => {
  loadPayments();
}, []);

const loadPayments = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const result = await paymentsApi.getAll();
    
    if (result.error) {
      setError(result.error);
      return;
    }
    
    if (result.data) {
      setPayments(result.data.payments || []);
    }
  } catch (err: any) {
    setError(err.message || 'Төлбөрүүдийг ачаалахад алдаа гарлаа');
  } finally {
    setLoading(false);
  }
};

// Loading state
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Төлбөрүүдийг ачаалж байна...</p>
      </div>
    </div>
  );
}

// Error state
if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-white text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-400 mb-4 text-xl">Алдаа гарлаа</p>
        <p className="text-white/60 mb-6">{error}</p>
        <button 
          onClick={loadPayments}
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Дахин оролдох
        </button>
      </div>
    </div>
  );
}
```

---

## Salaries Page - Бүрэн код

Файл: `app/admin/staff-salaries/page.tsx`

**Эхний хэсэгт нэмэх:**

```typescript
import { salariesApi } from '@/lib/api';

// State нэмэх
const [salaries, setSalaries] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Load function
useEffect(() => {
  loadSalaries();
}, []);

const loadSalaries = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const result = await salariesApi.getAll();
    
    if (result.error) {
      setError(result.error);
      return;
    }
    
    if (result.data) {
      setSalaries(result.data.salaries || []);
    }
  } catch (err: any) {
    setError(err.message || 'Цалингуудыг ачаалахад алдаа гарлаа');
  } finally {
    setLoading(false);
  }
};

// Loading state
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Цалингуудыг ачаалж байна...</p>
      </div>
    </div>
  );
}

// Error state
if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
      <div className="text-white text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-400 mb-4 text-xl">Алдаа гарлаа</p>
        <p className="text-white/60 mb-6">{error}</p>
        <button 
          onClick={loadSalaries}
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Дахин оролдох
        </button>
      </div>
    </div>
  );
}
```

---

## Ерөнхий загвар

Бүх хуудсанд дараах загварыг ашиглана:

### 1. Import нэмэх
```typescript
import { xxxApi } from '@/lib/api';
```

### 2. State нэмэх
```typescript
const [data, setData] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

### 3. useEffect нэмэх
```typescript
useEffect(() => {
  loadData();
}, []);
```

### 4. Load function
```typescript
const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const result = await xxxApi.getAll();
    if (result.data) {
      setData(result.data.xxx || []);
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 5. Loading/Error UI
```typescript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={loadData} />;
```

---

## Хуудсууд болон тэдгээрийн API

| Хуудас | API | Файл |
|--------|-----|------|
| Students | `studentsApi` | `/admin/students/page.tsx` |
| Teachers | `teachersApi` | `/admin/teachers/page.tsx` |
| Classes | `classesApi` | `/admin/classes/page.tsx` |
| Payments | `paymentsApi` | `/admin/student-payments/page.tsx` |
| Salaries | `salariesApi` | `/admin/staff-salaries/page.tsx` |
| Courses | `coursesApi` | `/admin/training-plan/page.tsx` |
| Majors | `majorsApi` | `/admin/training-management/page.tsx` |
| Departments | `departmentsApi` | `/admin/departments-branches/page.tsx` |

---

## Тестлэх

1. Сервер ажиллаж байгаа эсэхийг шалгах
2. Нэвтрэх: admin / admin123
3. Хуудас руу орох
4. Console шалгах (F12)
5. Network tab шалгах
6. API дуудлага харагдах ёстой

---

## Анхаарах зүйлс

- Mock data бүрэн устгах
- API өгөгдлийн бүтцийг зөв ашиглах
- Loading/Error state заавал нэмэх
- Refresh функц нэмэх (CRUD-ийн дараа)
