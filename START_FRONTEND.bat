@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0frontend"
echo Starting Frontend Dev Server...
echo URL: http://localhost:5173
echo.
npm run dev
pause
