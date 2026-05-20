import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes - нэвтрэх шаардлагатай хуудсууд
const protectedRoutes = [
  '/admin/dashboard',
  '/admin/training-dashboard',
  '/admin/finance-dashboard',
  '/admin/students',
  '/admin/teachers',
  '/admin/classes',
  '/admin/timetable',
  '/admin/exam-schedule',
  '/admin/attendance',
  '/admin/grades',
  '/admin/finance',
  '/admin/finance-management',
  '/admin/financial-reports',
  '/admin/budget-management',
  '/admin/student-payments',
  '/admin/payment-history',
  '/admin/overdue-payments',
  '/admin/payment-balance',
  '/admin/payment-progress',
  '/admin/tuition-invoices',
  '/admin/scholarship-list',
  '/admin/discount-management',
  '/admin/staff-salaries',
  '/admin/salary',
  '/admin/inventory',
  '/admin/maintenance-costs',
  '/admin/utility-bills',
  '/admin/other-income',
  '/admin/balance-sheet',
  '/admin/budget',
  '/admin/budget-planning',
  '/admin/monthly-reports',
  '/admin/quarterly-reports',
  '/admin/annual-reports',
  '/admin/financial-reports-management',
  '/admin/analytics-dashboard',
  '/admin/finance-dashboard',
  '/admin/training-management',
  '/admin/training-plan',
  '/admin/departments-branches',
  '/admin/organization-structure',
  '/admin/graduation',
  '/admin/grade-statistics',
  '/admin/attendance-reports',
  '/admin/profile',
  '/admin/settings',
  '/admin/user-permissions',
  '/admin/role-management',
  '/admin/audit-logs',
  '/admin/login-history',
  '/admin/system-monitoring',
  '/admin/system-reports',
  '/admin/backups',
  '/admin/data-management',
  '/admin/audit',
  '/admin/internal-audit',
  '/admin/external-audit',
  '/admin/audit-reports',
  '/admin/tax-records',
];

// Public routes - нэвтрэхгүйгээр хандаж болох хуудсууд
const publicRoutes = [
  '/login',
  '/admin/login',
  '/register',
  '/landing',
  '/home',
  '/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If it's a protected route, check for authentication
  if (isProtectedRoute) {
    // Check for token in cookies or headers
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // TODO: Verify token validity (optional, can be done on API routes)
    // For now, we trust the token exists
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
