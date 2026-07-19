@echo off
REM ContentPulse - Simple Startup Script for Windows
REM This script installs dependencies and starts both servers

echo.
echo ================================================
echo  ContentPulse - Development Server Launcher
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if backend/.env exists
if not exist "backend\.env" (
    echo.
    echo ERROR: backend\.env not found!
    echo.
    echo Please create backend\.env with:
    echo.
    echo NODE_ENV=development
    echo PORT=3001
    echo MONGODB_URI=mongodb://localhost:27017/contentpulse
    echo LOG_LEVEL=info
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

REM Check if frontend/.env exists
if not exist "frontend\.env" (
    echo.
    echo ERROR: frontend\.env not found!
    echo.
    echo Please create frontend\.env with:
    echo.
    echo VITE_API_URL=http://localhost:3001/api
    echo VITE_WS_URL=ws://localhost:3001
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo ================================================
echo  IMPORTANT: MongoDB Setup Required
echo ================================================
echo.
echo You must have MongoDB running before starting!
echo.
echo Option 1 - Local MongoDB:
echo   1. Download: https://www.mongodb.com/try/download/community
echo   2. Run: mongod
echo.
echo Option 2 - Cloud MongoDB Atlas:
echo   1. Go: https://www.mongodb.com/cloud/atlas
echo   2. Create cluster and get connection string
echo   3. Update backend\.env with MONGODB_URI
echo.
echo Is MongoDB ready? (Y/N)
set /p choice=
if /i "%choice%"=="N" (
    echo Please start MongoDB first!
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
echo.
npm install >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo ================================================
echo  Starting Servers...
echo ================================================
echo.
echo Starting Backend on port 3001...
start "ContentPulse Backend" cmd /k "cd backend && npm run dev"

echo Waiting 3 seconds...
timeout /t 3 /nobreak

echo Starting Frontend on port 5173...
start "ContentPulse Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ================================================
echo  Servers Started!
echo ================================================
echo.
echo Backend:  http://localhost:3001/api
echo Frontend: http://localhost:5173
echo.
echo WAIT FOR "ready" MESSAGES IN BOTH WINDOWS
echo Then open: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul
