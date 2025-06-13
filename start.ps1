# Krypton Tournament - Start Script
# This script starts both the backend and frontend servers

Write-Host "🚀 Starting Krypton Tournament Application..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Yellow

# Function to check if Node.js is installed
function Test-NodeJS {
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
        return $false
    }
}

# Function to check if npm is installed
function Test-NPM {
    try {
        $npmVersion = npm --version
        Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ npm not found. Please install npm first." -ForegroundColor Red
        return $false
    }
}

# Check prerequisites
if (-not (Test-NodeJS) -or -not (Test-NPM)) {
    Write-Host "❌ Prerequisites not met. Exiting..." -ForegroundColor Red
    exit 1
}

# Check if root dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if backend dependencies are installed
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Check if frontend dependencies are installed
if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

Write-Host "🔄 Starting both servers..." -ForegroundColor Cyan
Write-Host "Backend will run on: http://localhost:3000" -ForegroundColor Blue
Write-Host "Frontend will run on: http://localhost:5173" -ForegroundColor Blue
Write-Host "=====================================" -ForegroundColor Yellow

# Start both servers using npm script
npm run start
