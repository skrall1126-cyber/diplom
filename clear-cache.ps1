# PowerShell script to clear Next.js cache and restart dev server
# Run this script when Fast Refresh is not working

Write-Host "Clearing Next.js cache..." -ForegroundColor Yellow

# Stop any running Next.js processes
Get-Process | Where-Object { $_.ProcessName -like "*node*" -and $_.MainWindowTitle -like "*next*" } | Stop-Process -Force

# Remove .next folder
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ Removed .next folder" -ForegroundColor Green
} else {
    Write-Host "✓ .next folder not found (already cleared)" -ForegroundColor Green
}

# Remove node_modules/.cache folder
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "✓ Removed node_modules/.cache folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting dev server..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""

# Start dev server
npm run dev