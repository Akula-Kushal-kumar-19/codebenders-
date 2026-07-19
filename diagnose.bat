@echo off
REM ContentPulse - Diagnostic Script
REM Run this to check if everything is set up correctly

echo.
echo ================================================
echo  ContentPulse - System Diagnostic
echo ================================================
echo.

echo Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not installed!
    goto error
)

echo Checking npm...
npm --version
if errorlevel 1 (
    echo ERROR: npm not available!
    goto error
)

echo.
echo Checking file structure...
if not exist "backend" (
    echo ERROR: backend folder not found!
    goto error
)
if not exist "frontend" (
    echo ERROR: frontend folder not found!
    goto error
)
if not exist "shared" (
    echo ERROR: shared folder not found!
    goto error
)
echo OK: All folders present

echo.
echo Checking environment files...
if not exist "backend\.env" (
    echo MISSING: backend\.env
) else (
    echo OK: backend\.env exists
)

if not exist "frontend\.env" (
    echo MISSING: frontend\.env
) else (
    echo OK: frontend\.env exists
)

echo.
echo Checking dependencies...
if not exist "backend\node_modules" (
    echo MISSING: backend/node_modules - Run: cd backend && npm install
) else (
    echo OK: backend/node_modules exists
)

if not exist "frontend\node_modules" (
    echo MISSING: frontend/node_modules - Run: cd frontend && npm install
) else (
    echo OK: frontend/node_modules exists
)

if not exist "shared\node_modules" (
    echo MISSING: shared/node_modules - Run: cd shared && npm install
) else (
    echo OK: shared/node_modules exists
)

echo.
echo Checking ports...
netstat -ano | findstr :3001 >nul
if errorlevel 1 (
    echo OK: Port 3001 is available
) else (
    echo WARNING: Port 3001 is already in use!
)

netstat -ano | findstr :5173 >nul
if errorlevel 1 (
    echo OK: Port 5173 is available
) else (
    echo WARNING: Port 5173 is already in use!
)

netstat -ano | findstr :27017 >nul
if errorlevel 1 (
    echo WARNING: Port 27017 (MongoDB) is not running!
    echo Make sure to run: mongod
) else (
    echo OK: MongoDB appears to be running
)

echo.
echo ================================================
echo  Diagnostic Complete
echo ================================================
echo.
echo NEXT STEPS:
echo.
echo 1. If missing files, create them:
echo    - backend\.env
echo    - frontend\.env
echo.
echo 2. If missing node_modules, run:
echo    npm install
echo.
echo 3. Make sure MongoDB is running:
echo    mongod
echo.
echo 4. Then run:
echo    start-dev.bat
echo.
pause
exit /b 0

:error
echo.
echo ================================================
echo  ERRORS FOUND - PLEASE FIX ABOVE ISSUES
echo ================================================
echo.
pause
exit /b 1
