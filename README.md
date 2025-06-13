# Krypton Tournament

A tournament management system with a React frontend and Node.js backend.

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Option 1: Using npm scripts (Recommended)

```bash
# Install all dependencies
npm run install:all

# Start both backend and frontend
npm start
# or
npm run dev
```

### Option 2: Using PowerShell Script (Windows)

```powershell
# Run the PowerShell script
.\start.ps1
```

### Option 3: Using Batch File (Windows)

```cmd
# Run the batch file
start.bat
```

### Option 4: Manual Start

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## Available Scripts

### Root Level Scripts

- `npm start` - Start both backend and frontend simultaneously
- `npm run dev` - Same as start (development mode)
- `npm run install:all` - Install dependencies for root, backend, and frontend
- `npm run build` - Build the frontend for production
- `npm run start:backend` - Start only the backend server
- `npm run start:frontend` - Start only the frontend development server

### Backend Scripts

- `npm start` - Start the backend server with Node.js
- `npm run dev` - Start the backend server with nodemon (auto-restart on changes)

### Frontend Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Default Ports

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## Project Structure

```
krypton-tournament/
├── backend/          # Node.js/Express backend
├── frontend/         # React/Vite frontend
├── package.json      # Root package.json with scripts
├── start.ps1         # PowerShell start script
├── start.bat         # Batch start script
└── README.md         # This file
```

## Development Notes

- The backend and frontend run on different ports
- Both servers will start concurrently when using the main start scripts
- Make sure to install dependencies before running the application
- The scripts will automatically check and install missing dependencies

## Troubleshooting

- If you get permission errors with PowerShell scripts, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Make sure Node.js and npm are properly installed and in your PATH
- If ports are occupied, you may need to change the default ports in the respective configuration files
