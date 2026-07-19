# PowerShell Script to Push ContentPulse to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ContentPulse - GitHub Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git initialized!" -ForegroundColor Green
} else {
    Write-Host "Git repository already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: ContentPulse - Full-stack content performance system"

Write-Host ""
Write-Host "Checking for existing remote..." -ForegroundColor Yellow
$remoteUrl = git config --get remote.origin.url 2>$null
if ($remoteUrl) {
    Write-Host "Remote already configured: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "Setting remote origin..." -ForegroundColor Yellow
    git remote add origin https://github.com/vattamsanhth/codebenders.git
    Write-Host "Remote configured!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Note: You may be prompted for GitHub credentials" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Push complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository URL: https://github.com/vattamsanhth/codebenders" -ForegroundColor Green
