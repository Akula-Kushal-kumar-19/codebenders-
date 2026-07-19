@echo off
REM Git Commit and Push Script for ContentPulse

echo ========================================
echo ContentPulse - GitHub Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
    echo Git initialized!
) else (
    echo Git repository already exists
)

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit: ContentPulse - Full-stack content performance system"

echo.
echo Setting remote origin...
git remote add origin https://github.com/vattamsanhth/codebenders.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Push complete!
echo ========================================
