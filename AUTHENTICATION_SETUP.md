# Authentication & Authorization Setup

## Хийгдсэн ажлууд

### 1. Backend Authorization нэмэгдсэн API Routes

Дараах API routes-д role-based authorization нэмэгдсэн:

#### ✅ Students API (`/api/students`)
- **Permissions**: `MANAGE_STUDENTS` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST, PUT, DELETE
- **File**: `app/api/students/route.ts`, `app/api/students/[id]/route.ts`

#### ✅ Teachers API (`/api/teachers`)
- **Permissions**: `MANAGE_TEACHERS` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/teachers/route.ts`

#### ✅ Payments API (`/api/payments`)
- **Permissions**: `MANAGE_PAYMENTS` (SUPER_ADMIN, FINANCE_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/payments/route.ts`

#### ✅ Salaries API (`/api/salaries`)
- **Permissions**: `MANAGE_SALARIES` (SUPER_ADMIN, FINANCE_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/salaries/route.ts`

#### ✅ Classes API (`/api/classes`)
- **Permissions**: `MANAGE_CLASSES` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/classes/route.ts`

#### ✅ Courses API (`/api/courses`)
- **Permissions**: `MANAGE_COURSES` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/courses/route.ts`

#### ✅ Majors API (`/api/majors`)
- **Permissions**: `MANAGE_COURSES` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/majors/route.ts`

#### ✅ Departments API (`/api/departments`)
- **Permissions**: `MANAGE_COURSES` (SUPER_ADMIN, TRAINING_ADMIN)
- **Endpoints**: GET, POST
- **File**: `app/api/departments/route.ts`

### 2. Frontend API Client Functions

`lib/api.ts` файлд дараах API client functions нэмэгдсэн:

```typescript
// Classes API
classesApi.getAll(filters?)
classesApi.create(data)

// Courses API
coursesApi.getAll(filters?)
coursesApi.create(data)

// Majors API
majorsApi.getAll(filters?)
majorsApi.create(data)

// Departments API
departmentsApi.getAll()
departmentsApi.create(data)
```

### 3. Authentication Context

#### AuthContext (`contexts/AuthContext.tsx`)
- ✅ User state management
- ✅ Login/Logout functionality
- ✅ Role checking (hasRole, hasAnyRole)
- ✅ Token management
- ✅ Auto authentication check on mount
- ✅ withAuth HOC for protected pages

#### Usage Example:
```typescript
import { useAuth, withAuth } from '@/contexts/AuthContext';

function MyPage() {
  const { user, logout, hasRole } = useAuth();
  
  return (
    <div>
      <p>Welcome {user?.first_name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Protect page - only SUPER_ADMIN can access
export default withAuth(MyPage, ['SUPER_ADMIN']);
```

### 4. UI Components Updated

#### Sidebar (`components/Sidebar.tsx`)
- ✅ Logout button нэмэгдсэн
- ✅ useAuth hook ашиглаж байна
- ✅ User information харуулна

#### Navbar (`components/Navbar.tsx`)
- ✅ Real user data from AuthContext
- ✅ Dynamic role display
- ✅ User avatar with first name initial

#### Dashboard (`app/admin/dashboard/page.tsx`)
- ✅ withAuth HOC ашиглаж хамгаалагдсан
- ✅ Only SUPER_ADMIN can access

### 5. Middleware

#### Route Protection (`middleware.ts`)
- ✅ Protected routes: `/admin/*`, `/teacher/*`, `/student/*`
- ✅ Public routes: `/admin/login`, `/`, `/home`
- ✅ Auto redirect to login if not authenticated

#### API Authorization (`lib/auth-middleware.ts`)
- ✅ `withAuth()` - Authentication + Authorization check
- ✅ `requireAuth()` - JWT token verification
- ✅ `requireRole()` - Role-based access control
- ✅ `hasPermission()` - Permission checking helper

### 6. Role-Based Permissions

```typescript
export const PERMISSIONS = {
  // Admin permissions
  MANAGE_USERS: [ROLES.SUPER_ADMIN],
  MANAGE_SYSTEM: [ROLES.SUPER_ADMIN],
  
  // Training permissions
  MANAGE_STUDENTS: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
  MANAGE_TEACHERS: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
  MANAGE_CLASSES: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
  MANAGE_COURSES: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
  VIEW_STUDENTS: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN, ROLES.TEACHER],
  
  // Finance permissions
  MANAGE_PAYMENTS: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
  MANAGE_SALARIES: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
  VIEW_FINANCIAL_REPORTS: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
  MANAGE_BUDGET: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
  
  // Teacher permissions
  MANAGE_GRADES: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.TEACHER],
  MANAGE_ATTENDANCE: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.TEACHER],
  VIEW_OWN_CLASSES: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.TEACHER],
  
  // Student permissions
  VIEW_OWN_GRADES: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.TEACHER, ROLES.STUDENT],
  VIEW_OWN_ATTENDANCE: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.TEACHER, ROLES.STUDENT],
  VIEW_OWN_PAYMENTS: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN, ROLES.STUDENT],
};
```

## Дараагийн алхамууд

### Хийх шаардлагатай:

1. **Бусад pages-д withAuth HOC нэмэх**
   - Training admin pages
   - Finance admin pages
   - Teacher pages
   - Student pages

2. **Role-based UI rendering**
   - Sidebar menu items (эрхээс хамааран харуулах)
   - Action buttons (эрхээс хамааран идэвхжүүлэх/идэвхгүй болгох)
   - Data filtering (өөрийн мэдээллээ л харах)

3. **Token refresh mechanism**
   - Access token refresh endpoint
   - Auto refresh before expiration
   - Refresh token storage

4. **Error handling сайжруулах**
   - 401 Unauthorized - auto redirect to login
   - 403 Forbidden - show permission denied message
   - Network errors - retry mechanism

5. **Cookie-based authentication**
   - HttpOnly cookies for tokens
   - CSRF protection
   - Secure flag for production

6. **Audit logging**
   - Log all authentication attempts
   - Log permission denied events
   - Track user actions

7. **Password management**
   - Change password functionality
   - Forgot password flow
   - Password strength validation

8. **Session management**
   - Active sessions list
   - Force logout from all devices
   - Session timeout

## Тест хийх

### Login Test:
```bash
# Admin login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Protected API Test:
```bash
# Get students (requires token)
curl -X GET http://localhost:3001/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Role Test:
```bash
# Try to access finance API with training admin token (should fail)
curl -X GET http://localhost:3001/api/payments \
  -H "Authorization: Bearer TRAINING_ADMIN_TOKEN"
```

## Анхаарах зүйлс

1. **Token Security**
   - Tokens are stored in localStorage (client-side)
   - Consider using HttpOnly cookies for production
   - Implement token refresh mechanism

2. **Permission Checking**
   - Always check permissions on backend
   - Frontend checks are for UX only
   - Never trust client-side validation

3. **Error Messages**
   - Don't expose sensitive information in errors
   - Use generic messages for security
   - Log detailed errors server-side only

4. **Rate Limiting**
   - Implement rate limiting for login endpoint
   - Prevent brute force attacks
   - Use tools like express-rate-limit

## Файлууд

### Core Files:
- `lib/auth.ts` - JWT & bcrypt helpers
- `lib/auth-middleware.ts` - Authorization middleware
- `contexts/AuthContext.tsx` - React auth context
- `middleware.ts` - Next.js middleware for route protection

### API Routes:
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/students/route.ts`
- `app/api/teachers/route.ts`
- `app/api/payments/route.ts`
- `app/api/salaries/route.ts`
- `app/api/classes/route.ts`
- `app/api/courses/route.ts`
- `app/api/majors/route.ts`
- `app/api/departments/route.ts`

### UI Components:
- `components/Sidebar.tsx`
- `components/Navbar.tsx`
- `app/admin/dashboard/page.tsx`
- `app/admin/login/page.tsx`

### Client Library:
- `lib/api.ts` - Frontend API client

## Database

Анхны админ хэрэглэгч:
- **Username**: admin
- **Password**: admin123
- **Role**: SUPER_ADMIN
- **Email**: admin@indra.edu.mn

## Development Server

```bash
cd indra-cyber-home/indra-home
npm run dev
```

Server: http://localhost:3001
Login: http://localhost:3001/admin/login
