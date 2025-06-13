@echo off
echo 🚀 Starting Krypton Tournament Application...
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist backend\node_modules (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

if not exist frontend\node_modules (
    echo 📦 Installing frontend dependencies...
    cd frontend
    npm install
    cd ..
)

echo 🔄 Starting both servers...
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:5173
echo =====================================

npm run start
