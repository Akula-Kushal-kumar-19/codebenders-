# ContentPulse - Quick Start Guide

## Problem: Servers Not Running

If the project isn't running on localhost, follow these exact steps:

---

## STEP 1: Install MongoDB (CRITICAL)

### Option A: Local MongoDB (Recommended for Testing)

1. **Download MongoDB Community Edition:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows
   - Download the .msi installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB:**
   - Open Command Prompt or PowerShell
   - Run: `mongod`
   - You should see: `waiting for connections on port 27017`
   - **KEEP THIS WINDOW OPEN** while testing

### Option B: MongoDB Atlas (Cloud - Free)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Click "Connect" and copy the connection string
5. Open `backend/.env` and update:
   ```
   MONGODB_URI=your_copied_connection_string
   ```

---

## STEP 2: Create Environment Files

### Create `backend/.env`
File: `backend/.env`
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/contentpulse
LOG_LEVEL=info
FRONTEND_URL=http://localhost:3000
```

### Create `frontend/.env`
File: `frontend/.env`
```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

**Save both files!**

---

## STEP 3: Install Dependencies

Open Command Prompt in the project root:

```bash
npm install
```

This installs dependencies for all packages (backend, frontend, shared).

---

## STEP 4: Start the Servers

### On Windows: USE BATCH FILE (Easiest)

Double-click: `run-dev.bat`

This opens 2 new terminals automatically:
- Backend server (port 3001)
- Frontend server (port 5173)

---

### Manual Method (3 Terminals)

**Terminal 1 - MongoDB:**
```bash
mongod
```
Wait for: `waiting for connections on port 27017`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: `ContentPulse server running on port 3001`

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `Local: http://localhost:5173` or `ready in 500 ms`

---

## STEP 5: Open in Browser

Once you see "ready" messages in both backend and frontend terminals:

1. Open: **http://localhost:5173**
2. You should see the ContentPulse dashboard

---

## TROUBLESHOOTING

### "Cannot connect to MongoDB"
- [ ] Is `mongod` running in Terminal 1?
- [ ] Did you wait for "waiting for connections on port 27017"?
- [ ] Check MONGODB_URI in backend/.env is correct
- [ ] If using Atlas, did you add your IP to whitelist?

### "Port 3001 already in use"
```bash
# Kill the process using port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### "Port 5173 already in use"
```bash
# Kill the process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### "npm command not found"
- [ ] Is Node.js installed? Run: `node --version`
- [ ] Restart Command Prompt after installing Node.js

### "Module not found" errors
```bash
# Reinstall all dependencies
rm -r node_modules backend/node_modules frontend/node_modules shared/node_modules
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../shared && npm install
```

### "PowerShell execution policy" error
Use `run-dev.bat` instead, or run PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## API Testing (Optional)

After servers start, test in a new terminal:

```bash
# Health check
curl http://localhost:3001/api/health

# Create sample content
curl -X POST http://localhost:3001/api/content ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Test Article\", \"url\": \"https://example.com\", \"format\": \"article\", \"topic\": \"Tech\", \"length\": 1000, \"publishedAt\": \"2024-01-15T10:00:00Z\", \"channels\": [\"blog\"]}"
```

---

## Quick Reference

| Component | Port | URL |
|-----------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 3001 | http://localhost:3001/api |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## Expected Terminal Output

### Backend (npm run dev):
```
> ts-node src/index.ts
[2024-01-15 10:30:45] ContentPulse server running on port 3001
[2024-01-15 10:30:46] Connected to MongoDB
[2024-01-15 10:30:46] WebSocket server running on port 3001
```

### Frontend (npm run dev):
```
> vite

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### MongoDB (mongod):
```
mongod 7.0.0
waiting for connections on port 27017
```

---

## Success Checklist

- [ ] MongoDB is running (mongod terminal shows "waiting for connections")
- [ ] Backend started (shows "ContentPulse server running on port 3001")
- [ ] Frontend started (shows "Local: http://localhost:5173")
- [ ] Browser opens http://localhost:5173
- [ ] Dashboard loads without errors
- [ ] No red errors in browser console (F12)

**If ALL checked: You're ready to test! 🚀**

---

## Next Steps

1. Explore the Dashboard page
2. Go to Analytics tab
3. Check AI Insights
4. Try generating a Report

Enjoy using ContentPulse!
