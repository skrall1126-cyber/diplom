# PowerShell скрипт - Admin хуудсуудыг засах

$files = @(
    "app/admin/attendance-reports/page.tsx",
    "app/admin/audit-reports/page.tsx",
    "app/admin/balance-sheet/page.tsx",
    "app/admin/budget/page.tsx",
    "app/admin/budget-planning/page.tsx",
    "app/admin/external-audit/page.tsx",
    "app/admin/financial-reports/page.tsx",
    "app/admin/grade-statistics/page.tsx",
    "app/admin/internal-audit/page.tsx",
    "app/admin/maintenance-costs/page.tsx",
    "app/admin/monthly-reports/page.tsx",
    "app/admin/overdue-payments/page.tsx",
    "app/admin/payment-balance/page.tsx",
    "app/admin/payment-progress/page.tsx",
    "app/admin/quarterly-reports/page.tsx",
    "app/admin/salary/page.tsx",
    "app/admin/system-reports/page.tsx",
    "app/admin/tax-records/page.tsx",
    "app/admin/utility-bills/page.tsx"
)

foreach ($file in $files) {
    Write-Host "Засаж байна: $file"
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 1. useState import шалгах
    if ($content -notmatch 'import.*useState') {
        $content = $content -replace '(import.*from "react";)', 'import { useState } from "react";'
    }
    
    # 2. activeMenu state нэмэх (хэрэв байхгүй бол)
    if ($content -notmatch '\[activeMenu, setActiveMenu\]') {
        # export default function дараа state нэмэх
        $content = $content -replace '(export default function \w+\(\) \{)', "`$1`n  const [activeMenu, setActiveMenu] = useState(`"Нүүр хуудас`");"
    }
    
    # 3. Sidebar дээр activeMenu, onMenuChange нэмэх (хэрэв байхгүй бол)
    if ($content -match '<Sidebar\s+activeMenu=\{activeMenu\}\s+onMenuChange=\{setActiveMenu\}\s+/>') {
        # Аль хэдийн зөв байна
    } else {
        $content = $content -replace '<Sidebar\s*/>', '<Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />'
    }
    
    # 4. Давхар хаалтын тэмдэг устгах
    $content = $content -replace '\}\s*\}\s*$', '}'
    
    # 5. Давхар <div className="mx-auto max-w-6xl"> устгах
    $content = $content -replace '<div className="mx-auto max-w-7xl space-y-5">\s*<div className="mx-auto max-w-6xl">', '<div className="mx-auto max-w-7xl space-y-5">'
    
    # Файл хадгалах
    $content | Set-Content $file -Encoding UTF8 -NoNewline
    
    Write-Host "Амжилттай: $file" -ForegroundColor Green
}

Write-Host "`nБүх файл засагдлаа!" -ForegroundColor Cyan
