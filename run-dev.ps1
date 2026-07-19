# ContentPulse Development Environment Launcher
# Run this with: powershell -ExecutionPolicy Bypass -File run-dev.ps1

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "ContentPulse Development Environment" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: MongoDB Setup (Choose ONE):" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option A - Local MongoDB:" -ForegroundColor Green
Write-Host "  1. Download: https://www.mongodb.com/try/download/community"
Write-Host "  2. Install and run 'mongod' in a new terminal"
Write-Host ""
Write-Host "Option B - MongoDB Atlas (Cloud):" -ForegroundColor Green
Write-Host "  1. Create free account: https://www.mongodb.com/cloud/atlas"
Write-Host "  2. Create a cluster"
Write-Host "  3. Copy connection string"
Write-Host "  4. Update backend\.env with MONGODB_URI"
Write-Host ""

# Check if node_modules exist
if (!(Test-Path "backend/node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

if (!(Test-Path "frontend/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

Write-Host "Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend
Write-Host "Opening Backend terminal..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Wait a bit
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Opening Frontend terminal..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Servers starting..." -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Once both terminals show 'ready' messages:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "  Backend:  http://localhost:3001/api/health" -ForegroundColor Green
Write-Host ""
Write-Host "Press Enter to close this window..." -ForegroundColor Cyan
Read-Host
