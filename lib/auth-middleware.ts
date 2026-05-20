import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Middleware to verify JWT token
export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json(
        { error: 'Authorization header шаардлагатай' },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);

  if (!payload) {
    return {
      error: NextResponse.json(
        { error: 'Token буруу эсвэл хугацаа дууссан байна' },
        { status: 401 }
      ),
    };
  }

  return { user: payload };
}

// Middleware to check user role
export function requireRole(allowedRoles: string[]) {
  return async (request: NextRequest, user: any) => {
    if (!user || !allowedRoles.includes(user.role)) {
      return {
        error: NextResponse.json(
          { error: 'Хандах эрхгүй байна' },
          { status: 403 }
        ),
      };
    }
    return { user };
  };
}

// Helper to combine auth checks
export async function withAuth(
  request: NextRequest,
  allowedRoles?: string[]
) {
  // Check authentication
  const authResult = await requireAuth(request);
  if (authResult.error) {
    return authResult;
  }

  // Check authorization if roles specified
  if (allowedRoles && allowedRoles.length > 0) {
    const roleResult = await requireRole(allowedRoles)(request, authResult.user);
    if (roleResult.error) {
      return roleResult;
    }
  }

  return authResult;
}

// Role constants
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TRAINING_ADMIN: 'TRAINING_ADMIN',
  FINANCE_ADMIN: 'FINANCE_ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

// Permission helpers
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
} as const;

// Check if user has permission
export function hasPermission(userRole: string, permission: readonly string[]): boolean {
  return permission.includes(userRole);
}
