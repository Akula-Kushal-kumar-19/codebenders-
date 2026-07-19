@echo off
REM Run ContentPulse Development Environment

echo Starting MongoDB...
REM Uncomment the next line if MongoDB is installed locally
REM start mongod

echo.
echo ===============================================
echo ContentPulse Development Environment
echo ===============================================
echo.
echo IMPORTANT: Please follow these steps:
echo.
echo 1. MongoDB Setup (Choose ONE):
echo    Option A - Local MongoDB:
echo    - Download from: https://www.mongodb.com/try/download/community
echo    - Run in a NEW terminal: mongod
echo.
echo    Option B - MongoDB Atlas (Cloud):
echo    - Go to: https://www.mongodb.com/cloud/atlas
echo    - Create free account and cluster
echo    - Copy connection string
echo    - Update backend\.env with MONGODB_URI
echo.
echo ===============================================
echo.
echo 2. Starting Backend Server (Terminal 1)...
start cmd /k "cd backend && npm run dev"

echo.
echo 3. Starting Frontend Server (Terminal 2)...
timeout /t 3 /nobreak
start cmd /k "cd frontend && npm run dev"

echo.
echo ===============================================
echo WAIT FOR BOTH TERMINALS TO SHOW "ready" MESSAGES
echo ===============================================
echo.
echo Once ready, open your browser:
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:3001/api/health
echo.
pause
