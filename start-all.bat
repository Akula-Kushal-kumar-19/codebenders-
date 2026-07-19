@echo off
REM This script starts both backend and frontend servers

echo.
echo ================================================
echo Starting ContentPulse Development Servers
echo ================================================
echo.

REM Check if MongoDB is available
mongod --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  MongoDB not found in PATH
    echo Please start MongoDB manually in another terminal:
    echo $ mongod
    echo.
    echo Or download from: https://www.mongodb.com/try/download/community
    echo.
    pause
)

echo Starting Backend Server on port 3001...
start "ContentPulse Backend" cmd /k "cd backend && npm run dev"

echo Waiting 3 seconds...
timeout /t 3 /nobreak

echo Starting Frontend Server on port 5173...
start "ContentPulse Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ================================================
echo Servers Starting
echo ================================================
echo.
echo Wait for both terminals to show "ready" messages
echo.
echo Then open: http://localhost:5173
echo.
pause
