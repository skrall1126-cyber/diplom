# PowerShell script to add withAuth protection to admin pages

$pages = @(
    @{Path="app/admin/finance-dashboard/page.tsx"; Roles=@("SUPER_ADMIN", "FINANCE_ADMIN"); Name="FinanceAdminDashboard"},
    @{Path="app/admin/students/page.tsx"; Roles=@("SUPER_ADMIN", "TRAINING_ADMIN"); Name="Students"},
    @{Path="app/admin/teachers/page.tsx"; Roles=@("SUPER_ADMIN", "TRAINING_ADMIN"); Name="TeachersPage"},
    @{Path="app/admin/training-management/page.tsx"; Roles=@("SUPER_ADMIN", "TRAINING_ADMIN"); Name="TrainingManagement"},
    @{Path="app/admin/student-payments/page.tsx"; Roles=@("SUPER_ADMIN", "FINANCE_ADMIN"); Name="StudentPayments"},
    @{Path="app/admin/staff-salaries/page.tsx"; Roles=@("SUPER_ADMIN", "FINANCE_ADMIN"); Name="StaffSalaries"},
    @{Path="app/admin/inventory/page.tsx"; Roles=@("SUPER_ADMIN", "TRAINING_ADMIN", "FINANCE_ADMIN"); Name="Inventory"},
    @{Path="app/admin/settings/page.tsx"; Roles=@("SUPER_ADMIN"); Name="SettingsPage"},
    @{Path="app/admin/profile/page.tsx"; Roles=@("SUPER_ADMIN", "TRAINING_ADMIN", "FINANCE_ADMIN"); Name="AdminProfilePage"}
)

foreach ($page in $pages) {
    $filePath = $page.Path
    $roles = $page.Roles
    $functionName = $page.Name
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Skip if already protected
        if ($content -match "withAuth") {
            Write-Host "⏭️  Skipping $filePath - already protected" -ForegroundColor Yellow
            continue
        }
        
        # Add import
        if ($content -notmatch 'import.*withAuth') {
            $content = $content -replace '(import.*from.*;\r?\n)', "`$1import { withAuth } from '@/contexts/AuthContext';`n"
        }
        
        # Replace export default function with function
        $content = $content -replace "export default function $functionName", "function $functionName"
        
        # Add export with withAuth at the end
        $rolesStr = ($roles | ForEach-Object { "'$_'" }) -join ", "
        $exportLine = "`n`n// Protected page - only $($roles -join ', ') can access`nexport default withAuth($functionName, [$rolesStr]);`n"
        $content += $exportLine
        
        # Write back
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "✅ Protected $filePath with roles: $($roles -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "❌ File not found: $filePath" -ForegroundColor Red
    }
}

Write-Host "`n✨ Done!" -ForegroundColor Cyan
