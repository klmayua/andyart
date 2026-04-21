@echo off
echo ========================================
echo   AndyArt - GitHub + Netlify Setup
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Step 1: Initialize Git repository
echo ---------------------------------
git init
git add .
git commit -m "Initial commit: AndyArt gallery platform"
echo.

echo Step 2: Create GitHub repository
echo ---------------------------------
echo Go to: https://github.com/new
echo Create a repository named: andyart
echo.
pause

echo Step 3: Connect to GitHub
echo ---------------------------------
set /p GITHUB_USER="Enter your GitHub username: "
git branch -M main
git remote add origin https://github.com/%GITHUB_USER%/andyart.git
git push -u origin main
echo.

echo Step 4: Create Neon Database
echo ---------------------------------
echo Go to: https://console.neon.tech
echo Sign up and create a new project named: andyart
echo Copy your connection strings
echo.
pause

echo Step 5: Deploy to Netlify
echo ---------------------------------
echo Go to: https://app.netlify.com
echo Click: Add new site -^> Import an existing project
echo Select GitHub and choose: andyart
echo.
echo Build command: npm run build
echo Publish directory: .next
echo.
pause

echo Step 6: Set Environment Variables
echo ---------------------------------
echo In Netlify: Site settings -^> Environment variables
echo Add these variables:
echo   DATABASE_URL = (from Neon connection string)
echo   DIRECT_URL = (same as DATABASE_URL for Neon)
echo   NEXTAUTH_URL = https://your-site-name.netlify.app
echo   NEXTAUTH_SECRET = (run: openssl rand -base64 32)
echo.
pause

echo Step 7: Run Database Migrations
echo ---------------------------------
echo Create a .env file with your DATABASE_URL
echo Then run:
echo   npx prisma generate
echo   npx prisma db push
echo   npx prisma db seed
echo.
pause

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Your site should now be deployed on Netlify
echo Visit: https://your-site-name.netlify.app
echo.
pause
