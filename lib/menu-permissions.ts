// Menu permissions based on user roles

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  TRAINING_ADMIN: 'TRAINING_ADMIN',
  FINANCE_ADMIN: 'FINANCE_ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Menu item permission configuration
export interface MenuPermission {
  path: string;
  allowedRoles: UserRole[];
  label?: string;
}

// Define which roles can access which menu items
export const menuPermissions: MenuPermission[] = [
  // Dashboard
  { path: '/admin/dashboard', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/training-dashboard', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/finance-dashboard', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  
  // Governance (Super Admin only)
  { path: '/admin/analytics-dashboard', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/organization-structure', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/departments-branches', allowedRoles: [ROLES.SUPER_ADMIN] },
  
  // Training Management
  { path: '/admin/training-management', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/training-plan', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/students', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/teachers', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/classes', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/timetable', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/attendance', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/grades', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/exam-schedule', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/graduation', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/scholarship-list', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  
  // Finance Management
  { path: '/admin/finance-management', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/student-payments', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/payment-balance', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/payment-progress', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/payment-history', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/overdue-payments', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/tuition-invoices', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/staff-salaries', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/salary', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/budget', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/budget-management', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/budget-planning', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/discount-management', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/other-income', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/utility-bills', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/maintenance-costs', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/tax-records', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  
  // Reports
  { path: '/admin/financial-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/financial-reports-management', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/balance-sheet', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/annual-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/monthly-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/quarterly-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/grade-statistics', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/attendance-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN] },
  { path: '/admin/system-reports', allowedRoles: [ROLES.SUPER_ADMIN] },
  
  // Audit & Control
  { path: '/admin/audit', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/internal-audit', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/external-audit', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/audit-reports', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/audit-logs', allowedRoles: [ROLES.SUPER_ADMIN] },
  
  // System Management (Super Admin only)
  { path: '/admin/user-permissions', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/role-management', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/system-monitoring', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/login-history', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/backups', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/data-management', allowedRoles: [ROLES.SUPER_ADMIN] },
  { path: '/admin/settings', allowedRoles: [ROLES.SUPER_ADMIN] },
  
  // Shared
  { path: '/admin/profile', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
  { path: '/admin/inventory', allowedRoles: [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN] },
];

/**
 * Check if user has permission to access a menu item
 */
export function hasMenuPermission(userRole: UserRole | null | undefined, menuPath: string): boolean {
  if (!userRole) return false;
  
  // Super admin has access to everything
  if (userRole === ROLES.SUPER_ADMIN) return true;
  
  // Find permission for this path
  const permission = menuPermissions.find(p => p.path === menuPath);
  
  // If no specific permission defined, deny access
  if (!permission) return false;
  
  // Check if user's role is in allowed roles
  return permission.allowedRoles.includes(userRole);
}

/**
 * Filter menu items based on user role
 */
export function filterMenuItems<T extends { href?: string | null; sub?: any[] }>(
  items: T[],
  userRole: UserRole | null | undefined
): T[] {
  if (!userRole) return [];
  
  return items
    .map(item => {
      // If item has sub-items, filter them recursively
      if (item.sub && Array.isArray(item.sub)) {
        const filteredSub = item.sub.filter(subItem => 
          subItem.href ? hasMenuPermission(userRole, subItem.href) : true
        );
        
        // If no sub-items remain after filtering, hide parent
        if (filteredSub.length === 0) return null;
        
        return { ...item, sub: filteredSub };
      }
      
      // If item has href, check permission
      if (item.href) {
        return hasMenuPermission(userRole, item.href) ? item : null;
      }
      
      // Items without href (like dividers) are always shown
      return item;
    })
    .filter((item): item is T => item !== null);
}

/**
 * Get default dashboard based on user role
 */
export function getDefaultDashboard(userRole: UserRole | null | undefined): string {
  switch (userRole) {
    case ROLES.SUPER_ADMIN:
      return '/admin/dashboard';
    case ROLES.TRAINING_ADMIN:
      return '/admin/training-dashboard';
    case ROLES.FINANCE_ADMIN:
      return '/admin/finance-dashboard';
    case ROLES.TEACHER:
      return '/teacher/home';
    case ROLES.STUDENT:
      return '/home';
    default:
      return '/admin/login';
  }
}

/**
 * Check if user can perform an action
 */
export function canPerformAction(userRole: UserRole | null | undefined, action: string): boolean {
  if (!userRole) return false;
  
  // Super admin can do everything
  if (userRole === ROLES.SUPER_ADMIN) return true;
  
  // Define action permissions
  const actionPermissions: Record<string, UserRole[]> = {
    'create_student': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    'edit_student': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    'delete_student': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    'view_student': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN, ROLES.FINANCE_ADMIN, ROLES.TEACHER],
    
    'create_teacher': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    'edit_teacher': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    'delete_teacher': [ROLES.SUPER_ADMIN, ROLES.TRAINING_ADMIN],
    
    'create_payment': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    'edit_payment': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    'delete_payment': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    'view_payment': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    
    'create_salary': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    'edit_salary': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    'delete_salary': [ROLES.SUPER_ADMIN, ROLES.FINANCE_ADMIN],
    
    'manage_system': [ROLES.SUPER_ADMIN],
    'manage_users': [ROLES.SUPER_ADMIN],
    'view_audit_logs': [ROLES.SUPER_ADMIN],
  };
  
  const allowedRoles = actionPermissions[action];
  if (!allowedRoles) return false;
  
  return allowedRoles.includes(userRole);
}
