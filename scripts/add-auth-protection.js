const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Role mappings for different admin pages
const roleMapping = {
  // Super Admin only pages
  'dashboard': ['SUPER_ADMIN'],
  'user-permissions': ['SUPER_ADMIN'],
  'role-management': ['SUPER_ADMIN'],
  'system-monitoring': ['SUPER_ADMIN'],
  'system-reports': ['SUPER_ADMIN'],
  'login-history': ['SUPER_ADMIN'],
  'audit-logs': ['SUPER_ADMIN'],
  'backups': ['SUPER_ADMIN'],
  'settings': ['SUPER_ADMIN'],
  'organization-structure': ['SUPER_ADMIN'],
  'departments-branches': ['SUPER_ADMIN'],
  
  // Training Admin pages
  'training-dashboard': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'training-management': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'training-plan': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'students': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'teachers': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'classes': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'timetable': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'attendance': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'grades': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'grade-statistics': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'exam-schedule': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'graduation': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  'scholarship-list': ['SUPER_ADMIN', 'TRAINING_ADMIN'],
  
  // Finance Admin pages
  'finance-dashboard': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'finance-management': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'student-payments': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'payment-balance': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'payment-progress': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'payment-history': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'overdue-payments': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'tuition-invoices': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'staff-salaries': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'salary': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'budget': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'budget-management': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'budget-planning': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'financial-reports': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'financial-reports-management': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'balance-sheet': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'annual-reports': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'monthly-reports': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'quarterly-reports': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'discount-management': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'other-income': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'utility-bills': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'maintenance-costs': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'tax-records': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  
  // Shared pages (all admins)
  'profile': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'inventory': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'internal-audit': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'external-audit': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'audit': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'audit-reports': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'data-management': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'analytics-dashboard': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
  'attendance-reports': ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'],
};

function addAuthProtection(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has withAuth
    if (content.includes('withAuth') || content.includes('from "@/contexts/AuthContext"')) {
      console.log(`⏭️  Skipping ${filePath} - already protected`);
      return;
    }
    
    // Skip login page
    if (filePath.includes('/login/page.tsx')) {
      console.log(`⏭️  Skipping ${filePath} - login page`);
      return;
    }
    
    // Get page name from path
    const pageName = path.basename(path.dirname(filePath));
    const roles = roleMapping[pageName] || ['SUPER_ADMIN', 'TRAINING_ADMIN', 'FINANCE_ADMIN'];
    
    // Add import if not exists
    if (!content.includes('import { withAuth') && !content.includes('import { useAuth')) {
      // Find the last import statement
      const importRegex = /import .+ from .+;/g;
      const imports = content.match(importRegex);
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const importIndex = content.lastIndexOf(lastImport);
        const afterImport = importIndex + lastImport.length;
        
        content = content.slice(0, afterImport) + 
                  '\nimport { withAuth } from "@/contexts/AuthContext";' +
                  content.slice(afterImport);
      }
    }
    
    // Find export default function and replace
    const exportRegex = /export default function (\w+)/;
    const match = content.match(exportRegex);
    
    if (match) {
      const functionName = match[1];
      
      // Replace export default function with just function
      content = content.replace(exportRegex, `function ${functionName}`);
      
      // Add export with withAuth at the end
      const rolesStr = roles.map(r => `'${r}'`).join(', ');
      content += `\n\n// Protected page - only ${roles.join(', ')} can access\nexport default withAuth(${functionName}, [${rolesStr}]);\n`;
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Protected ${filePath} with roles: ${roles.join(', ')}`);
    } else {
      console.log(`⚠️  Could not find export in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Find all admin page files
const adminPages = glob.sync('app/admin/**/page.tsx', {
  cwd: path.join(__dirname, '..'),
  absolute: true,
});

console.log(`Found ${adminPages.length} admin pages\n`);

adminPages.forEach(addAuthProtection);

console.log('\n✨ Done!');
