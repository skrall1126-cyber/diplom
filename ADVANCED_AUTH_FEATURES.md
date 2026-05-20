# Advanced Authentication Features

## Хийгдсэн ажлууд - Phase 2

### 1. ✅ Protected Pages with withAuth HOC

Дараах admin pages-д withAuth HOC нэмэгдсэн:

#### Super Admin Only:
- `/admin/dashboard` - Main dashboard
- `/admin/settings` - System settings
- `/admin/user-permissions` - User permissions management
- `/admin/role-management` - Role management
- `/admin/system-monitoring` - System monitoring
- `/admin/system-reports` - System reports
- `/admin/login-history` - Login history
- `/admin/audit-logs` - Audit logs
- `/admin/backups` - System backups
- `/admin/organization-structure` - Organization structure
- `/admin/departments-branches` - Departments & branches

#### Training Admin Pages:
- `/admin/training-dashboard` - Training dashboard
- `/admin/training-management` - Training management
- `/admin/students` - Students list
- `/admin/teachers` - Teachers list
- `/admin/classes` - Classes management
- `/admin/timetable` - Timetable
- `/admin/attendance` - Attendance tracking
- `/admin/grades` - Grades management
- `/admin/exam-schedule` - Exam schedule
- `/admin/graduation` - Graduation management
- `/admin/scholarship-list` - Scholarship list

#### Finance Admin Pages:
- `/admin/finance-dashboard` - Finance dashboard
- `/admin/student-payments` - Student payments
- `/admin/staff-salaries` - Staff salaries
- `/admin/budget-management` - Budget management
- `/admin/financial-reports` - Financial reports
- `/admin/payment-history` - Payment history
- `/admin/overdue-payments` - Overdue payments
- `/admin/tuition-invoices` - Tuition invoices
- `/admin/discount-management` - Discount management
- `/admin/other-income` - Other income
- `/admin/utility-bills` - Utility bills
- `/admin/maintenance-costs` - Maintenance costs
- `/admin/tax-records` - Tax records

#### Shared Pages (All Admins):
- `/admin/profile` - User profile
- `/admin/inventory` - Inventory management
- `/admin/internal-audit` - Internal audit
- `/admin/external-audit` - External audit

### 2. ✅ Role-Based UI Rendering

**File**: `lib/menu-permissions.ts`

#### Features:
- `hasMenuPermission()` - Check if user can access menu item
- `filterMenuItems()` - Filter menu items based on role
- `getDefaultDashboard()` - Get default dashboard for role
- `canPerformAction()` - Check if user can perform action

#### Usage Example:
```typescript
import { hasMenuPermission, filterMenuItems, canPerformAction } from '@/lib/menu-permissions';

// Check menu permission
if (hasMenuPermission(user.role, '/admin/students')) {
  // Show menu item
}

// Filter menu items
const filteredMenu = filterMenuItems(menuItems, user.role);

// Check action permission
if (canPerformAction(user.role, 'create_student')) {
  // Show create button
}
```

#### Action Permissions:
```typescript
const actions = {
  // Students
  'create_student': [SUPER_ADMIN, TRAINING_ADMIN],
  'edit_student': [SUPER_ADMIN, TRAINING_ADMIN],
  'delete_student': [SUPER_ADMIN, TRAINING_ADMIN],
  'view_student': [SUPER_ADMIN, TRAINING_ADMIN, FINANCE_ADMIN, TEACHER],
  
  // Teachers
  'create_teacher': [SUPER_ADMIN, TRAINING_ADMIN],
  'edit_teacher': [SUPER_ADMIN, TRAINING_ADMIN],
  'delete_teacher': [SUPER_ADMIN, TRAINING_ADMIN],
  
  // Payments
  'create_payment': [SUPER_ADMIN, FINANCE_ADMIN],
  'edit_payment': [SUPER_ADMIN, FINANCE_ADMIN],
  'delete_payment': [SUPER_ADMIN, FINANCE_ADMIN],
  'view_payment': [SUPER_ADMIN, FINANCE_ADMIN],
  
  // System
  'manage_system': [SUPER_ADMIN],
  'manage_users': [SUPER_ADMIN],
  'view_audit_logs': [SUPER_ADMIN],
};
```

### 3. ✅ Token Refresh Mechanism

**Files**:
- `lib/auth.ts` - generateRefreshToken(), refreshAccessToken()
- `app/api/auth/refresh/route.ts` - Refresh token endpoint
- `lib/api.ts` - Auto refresh logic in apiCall()

#### How it works:
1. **Login**: User receives both access token (1h) and refresh token (7d)
2. **API Call**: If 401 error, automatically try to refresh token
3. **Refresh**: Use refresh token to get new access token
4. **Retry**: Retry original request with new token
5. **Logout**: If refresh fails, logout user

#### Token Lifetimes:
- **Access Token**: 1 hour (short-lived for security)
- **Refresh Token**: 7 days (long-lived for convenience)

#### API Endpoint:
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}

# Response:
{
  "token": "new-access-token"
}
```

#### Frontend Auto Refresh:
```typescript
// In lib/api.ts - apiCall() function
if (response.status === 401) {
  // Try to refresh token
  const refreshResponse = await fetch('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  
  if (refreshResponse.ok) {
    // Save new token and retry request
    const { token } = await refreshResponse.json();
    localStorage.setItem('token', token);
    
    // Retry original request
    response = await fetch(originalUrl, originalOptions);
  } else {
    // Refresh failed, logout
    logout();
  }
}
```

### 4. ✅ Error Handling Components

**File**: `components/ErrorBoundary.tsx`

#### Components:
1. **ErrorBoundary** - React error boundary for catching errors
2. **ErrorDisplay** - Display error messages with retry button
3. **UnauthorizedError** - 401 error page
4. **ForbiddenError** - 403 error page
5. **LoadingSpinner** - Loading indicator

#### Usage:
```typescript
import { 
  ErrorBoundary, 
  ErrorDisplay, 
  UnauthorizedError, 
  ForbiddenError,
  LoadingSpinner 
} from '@/components/ErrorBoundary';

// Wrap app with error boundary
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Show error message
<ErrorDisplay 
  error="Алдаа гарлаа" 
  onRetry={() => refetch()} 
/>

// Show 401 error
<UnauthorizedError onLogin={() => router.push('/login')} />

// Show 403 error
<ForbiddenError onGoBack={() => router.back()} />

// Show loading
<LoadingSpinner message="Уншиж байна..." />
```

### 5. ✅ Password Management

**Files**:
- `app/api/auth/change-password/route.ts` - Change password API
- `components/ChangePasswordModal.tsx` - Change password modal

#### Features:
- Current password verification
- New password validation (min 6 characters)
- Password confirmation
- Show/hide password toggle
- Success/error messages

#### API Endpoint:
```bash
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "old-password",
  "newPassword": "new-password",
  "confirmPassword": "new-password"
}

# Response:
{
  "message": "Нууц үг амжилттай солигдлоо"
}
```

#### Usage:
```typescript
import ChangePasswordModal from '@/components/ChangePasswordModal';

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Нууц үг солих
      </button>
      
      <ChangePasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => alert('Амжилттай солигдлоо')}
      />
    </>
  );
}
```

### 6. ✅ UI Components Updated

#### Sidebar:
- ✅ Logout button with icon
- ✅ useAuth hook integration
- ✅ User information display

#### Navbar:
- ✅ Real user data from AuthContext
- ✅ Dynamic role display
- ✅ User avatar with first name initial

## Файлууд

### New Files:
```
✅ lib/menu-permissions.ts - Menu permission helpers
✅ app/api/auth/refresh/route.ts - Token refresh endpoint
✅ app/api/auth/change-password/route.ts - Change password endpoint
✅ components/ErrorBoundary.tsx - Error handling components
✅ components/ChangePasswordModal.tsx - Change password modal
✅ scripts/protect-pages.ps1 - PowerShell script for batch protection
✅ ADVANCED_AUTH_FEATURES.md - This documentation
```

### Updated Files:
```
✅ lib/auth.ts - Added refresh token functions
✅ lib/api.ts - Added auto refresh logic
✅ contexts/AuthContext.tsx - Added refresh token handling
✅ components/Sidebar.tsx - Added logout button
✅ components/Navbar.tsx - Added real user data
✅ app/admin/dashboard/page.tsx - Protected with withAuth
✅ app/admin/training-dashboard/page.tsx - Protected with withAuth
✅ app/admin/finance-dashboard/page.tsx - Protected with withAuth
✅ app/admin/students/page.tsx - Protected with withAuth
✅ app/admin/teachers/page.tsx - Protected with withAuth
✅ app/admin/training-management/page.tsx - Protected with withAuth
✅ app/admin/student-payments/page.tsx - Protected with withAuth
✅ app/admin/staff-salaries/page.tsx - Protected with withAuth
✅ app/admin/inventory/page.tsx - Protected with withAuth
✅ app/admin/settings/page.tsx - Protected with withAuth
✅ app/admin/profile/page.tsx - Protected with withAuth
```

## Тест хийх

### 1. Token Refresh Test:
```bash
# Login to get tokens
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Wait for access token to expire (1 hour)
# Or manually test with expired token

# Try to access protected endpoint
# Should auto-refresh and succeed
curl -X GET http://localhost:3001/api/students \
  -H "Authorization: Bearer EXPIRED_TOKEN"
```

### 2. Role-Based Access Test:
```bash
# Login as training admin
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"training_admin","password":"password"}'

# Try to access finance endpoint (should fail with 403)
curl -X GET http://localhost:3001/api/payments \
  -H "Authorization: Bearer TRAINING_ADMIN_TOKEN"

# Try to access training endpoint (should succeed)
curl -X GET http://localhost:3001/api/students \
  -H "Authorization: Bearer TRAINING_ADMIN_TOKEN"
```

### 3. Password Change Test:
```bash
# Change password
curl -X POST http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "currentPassword": "admin123",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }'
```

## Дараагийн алхамууд

### Хийх шаардлагатай:

1. **Cookie-based Authentication** ⏳
   - HttpOnly cookies for tokens
   - CSRF protection
   - Secure flag for production

2. **Audit Logging** ⏳
   - Log all authentication attempts
   - Log permission denied events
   - Track user actions
   - Store in audit_logs table

3. **Session Management** ⏳
   - Active sessions list
   - Force logout from all devices
   - Session timeout
   - Concurrent session limit

4. **Two-Factor Authentication (2FA)** ⏳
   - TOTP (Time-based One-Time Password)
   - SMS verification
   - Backup codes

5. **Password Reset Flow** ⏳
   - Forgot password endpoint
   - Email verification
   - Reset token generation
   - Password reset page

6. **Rate Limiting** ⏳
   - Login attempt limiting
   - API rate limiting
   - Brute force protection

7. **Email Notifications** ⏳
   - Password changed notification
   - New login notification
   - Suspicious activity alert

8. **Role Management UI** ⏳
   - Create/edit/delete roles
   - Assign permissions to roles
   - Assign roles to users

## Security Best Practices

### ✅ Implemented:
- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based access control
- Token refresh mechanism
- Protected API routes
- Protected pages with HOC

### ⏳ To Implement:
- HttpOnly cookies (instead of localStorage)
- CSRF protection
- Rate limiting
- Audit logging
- Session management
- 2FA support

## Performance Considerations

1. **Token Storage**:
   - Currently using localStorage (client-side)
   - Consider HttpOnly cookies for production
   - Reduces XSS attack surface

2. **Token Refresh**:
   - Auto-refresh on 401 errors
   - Prevents unnecessary re-login
   - Improves user experience

3. **Permission Checking**:
   - Backend validation is primary
   - Frontend checks for UX only
   - Never trust client-side validation

## Deployment Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Enable rate limiting
- [ ] Set up audit logging
- [ ] Configure session timeout
- [ ] Enable CSRF protection
- [ ] Set up monitoring alerts
- [ ] Configure backup strategy
- [ ] Test all authentication flows
- [ ] Test all authorization rules
- [ ] Load test authentication endpoints

## Support

Асуулт, санал байвал:
- GitHub Issues
- Email: admin@indra.edu.mn
- Documentation: /docs/authentication
