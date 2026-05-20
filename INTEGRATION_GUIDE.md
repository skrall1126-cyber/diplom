# API Integration Guide - Админы хуудсуудыг Database-тай холбох

## Ерөнхий зарчим

Одоо админы хуудсууд **mock data** ашиглаж байна. Тэдгээрийг **бодит API**-тай холбох хэрэгтэй.

## Алхам 1: API функцууд ашиглах

`lib/api.ts` файлд бүх API функцууд бэлэн байна:

```typescript
import { studentsApi, teachersApi, classesApi, paymentsApi } from '@/lib/api';
```

## Алхам 2: Mock data-г устгаад API дуудах

### Өмнө (Mock data):

```typescript
const studentsData = [
  { id: 1, name: "Төртэмүүлэн", ... },
  { id: 2, name: "Э.Батжаргал", ... },
];
```

### Одоо (API call):

```typescript
const [students, setStudents] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  loadStudents();
}, []);

const loadStudents = async () => {
  try {
    setLoading(true);
    const result = await studentsApi.getAll();
    
    if (result.error) {
      setError(result.error);
      return;
    }
    
    if (result.data) {
      setStudents(result.data.students);
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## Алхам 3: CRUD үйлдлүүд

### CREATE - Шинэ оюутан нэмэх

```typescript
const handleAddStudent = async (studentData: any) => {
  try {
    const result = await studentsApi.create(studentData);
    
    if (result.error) {
      alert(result.error);
      return;
    }
    
    // Амжилттай - жагсаалтыг дахин ачаалах
    await loadStudents();
    setShowAddStudentModal(false);
    alert('Оюутан амжилттай нэмэгдлээ!');
  } catch (err: any) {
    alert(err.message);
  }
};
```

### UPDATE - Оюутан засах

```typescript
const handleUpdateStudent = async (id: string, studentData: any) => {
  try {
    const result = await studentsApi.update(id, studentData);
    
    if (result.error) {
      alert(result.error);
      return;
    }
    
    // Амжилттай - жагсаалтыг дахин ачаалах
    await loadStudents();
    setShowEditStudentModal(false);
    alert('Оюутан амжилттай засагдлаа!');
  } catch (err: any) {
    alert(err.message);
  }
};
```

### DELETE - Оюутан устгах

```typescript
const handleDeleteStudent = async (id: string) => {
  if (!confirm('Энэ оюутныг устгах уу?')) return;
  
  try {
    const result = await studentsApi.delete(id);
    
    if (result.error) {
      alert(result.error);
      return;
    }
    
    // Амжилттай - жагсаалтыг дахин ачаалах
    await loadStudents();
    alert('Оюутан амжилттай устгагдлаа!');
  } catch (err: any) {
    alert(err.message);
  }
};
```

## Алхам 4: Loading болон Error state

```typescript
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Уншиж байна...</p>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <p className="text-red-400 mb-4">Алдаа: {error}</p>
        <button 
          onClick={loadStudents}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Дахин оролдох
        </button>
      </div>
    </div>
  );
}
```

## Хуудсууд болон тэдгээрийн API

### 1. Students Page (`/admin/students`)
- **API**: `studentsApi`
- **Функцууд**: `getAll()`, `create()`, `update()`, `delete()`
- **Mock data**: `studentsData` array

### 2. Teachers Page (`/admin/teachers`)
- **API**: `teachersApi`
- **Функцууд**: `getAll()`, `create()`, `update()`, `delete()`
- **Mock data**: `teachersData` array

### 3. Classes Page (`/admin/classes`)
- **API**: `classesApi`
- **Функцууд**: `getAll()`, `create()`, `update()`, `delete()`
- **Mock data**: `classesData` array

### 4. Payments Page (`/admin/student-payments`)
- **API**: `paymentsApi`
- **Функцууд**: `getAll()`, `create()`, `update()`
- **Mock data**: `paymentsData` array

### 5. Salaries Page (`/admin/staff-salaries`)
- **API**: `salariesApi`
- **Функцууд**: `getAll()`, `create()`, `update()`
- **Mock data**: `salariesData` array

## Жишээ: Students Page-ийг бүрэн холбох

```typescript
"use client";

import { useState, useEffect } from "react";
import { withAuth } from '@/contexts/AuthContext';
import { studentsApi } from '@/lib/api';
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

function Students() {
  // State
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState("Оюутны жагсаалт");
  
  // Load students on mount
  useEffect(() => {
    loadStudents();
  }, []);
  
  // Load students from API
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
  
  // Add student
  const handleAddStudent = async (studentData: any) => {
    try {
      const result = await studentsApi.create(studentData);
      
      if (result.error) {
        alert(result.error);
        return;
      }
      
      await loadStudents();
      alert('Оюутан амжилттай нэмэгдлээ!');
    } catch (err: any) {
      alert(err.message);
    }
  };
  
  // Update student
  const handleUpdateStudent = async (id: string, studentData: any) => {
    try {
      const result = await studentsApi.update(id, studentData);
      
      if (result.error) {
        alert(result.error);
        return;
      }
      
      await loadStudents();
      alert('Оюутан амжилттай засагдлаа!');
    } catch (err: any) {
      alert(err.message);
    }
  };
  
  // Delete student
  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Энэ оюутныг устгах уу?')) return;
    
    try {
      const result = await studentsApi.delete(id);
      
      if (result.error) {
        alert(result.error);
        return;
      }
      
      await loadStudents();
      alert('Оюутан амжилттай устгагдлаа!');
    } catch (err: any) {
      alert(err.message);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Уншиж байна...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06030f]">
        <div className="text-white text-center">
          <p className="text-red-400 mb-4 text-xl">Алдаа: {error}</p>
          <button 
            onClick={loadStudents}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Дахин оролдох
          </button>
        </div>
      </div>
    );
  }
  
  // Main render
  return (
    <div className="min-h-screen font-sans text-white">
      <Navbar />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <main className="flex-1 p-6">
          {/* Your existing UI code here */}
          {/* Use {students} instead of {studentsData} */}
        </main>
      </div>
    </div>
  );
}

export default withAuth(Students, ['SUPER_ADMIN', 'TRAINING_ADMIN']);
```

## Анхаарах зүйлс

1. **Authentication**: Бүх API дуудлага автоматаар token илгээнэ (`lib/api.ts`-д тохируулсан)
2. **Error handling**: Бүх алдааг барьж, хэрэглэгчид харуулах
3. **Loading state**: Өгөгдөл ачаалж байх үед spinner харуулах
4. **Refresh**: CRUD үйлдэл хийсний дараа жагсаалтыг дахин ачаалах
5. **Authorization**: `withAuth` HOC ашиглан хуудсыг хамгаалах

## Database Schema

Supabase-д дараах table-ууд байна:
- `users` - Хэрэглэгчид
- `students` - Оюутнууд
- `teachers` - Багш нар
- `classes` - Ангиуд
- `courses` - Хичээлүүд
- `majors` - Мэргэжлүүд
- `departments` - Тэнхимүүд
- `payments` - Төлбөрүүд
- `salaries` - Цалингууд

## Дараагийн алхамууд

1. ✅ Authentication систем ажиллаж байна
2. ✅ API routes бэлэн байна
3. ✅ Database холбогдсон
4. ⏳ Админы хуудсуудыг API-тай холбох (энэ гарын авлагыг ашиглан)
5. ⏳ Бодит өгөгдөл оруулах
6. ⏳ Тестлэх

## Тусламж

Хэрэв асуудал гарвал:
1. Browser console шалгах (F12)
2. Network tab шалгах (API дуудлагууд харагдана)
3. Server logs шалгах (terminal дээр)
