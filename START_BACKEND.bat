@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0backend"
echo Starting Backend Server...
echo PORT: 3001
echo MongoDB URI: mongodb://localhost:27017/contentpulse
echo.
npm run dev
pause
