# ContentPulse - Complete Setup & Troubleshooting Guide

## Why Your Project Isn't Running on Localhost

The most common reason is: **MongoDB is not running**

---

## COMPLETE SETUP - FOLLOW THIS EXACTLY

### Phase 1: MongoDB Installation (15 minutes)

#### Option A: Local MongoDB (Recommended for Development)

1. **Download MongoDB Community Edition:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Click: "Download"

2. **Install MongoDB:**
   - Run the downloaded `.msi` file
   - Click through the installation wizard
   - Let it install to default location: `C:\Program Files\MongoDB`

3. **Start MongoDB:**
   - Open Command Prompt (Win + R, type `cmd`, Enter)
   - Run: `mongod`
   - Wait for this message:
     ```
     [initandlisten] waiting for connections on port 27017
     ```
   - **KEEP THIS WINDOW OPEN** - MongoDB must stay running

#### Option B: Cloud MongoDB Atlas (Free, No Installation)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create account
3. Create a free cluster
4. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true
   ```
5. Skip to **Phase 2** and use this connection string in backend/.env

---

### Phase 2: Create Environment Files

#### File 1: `backend/.env`

1. Open `backend` folder in your project
2. Create a new file named `.env`
3. Copy and paste this content:

```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/contentpulse
LOG_LEVEL=info
FRONTEND_URL=http://localhost:3000
```

**SAVE THE FILE** (Ctrl + S)

#### File 2: `frontend/.env`

1. Open `frontend` folder in your project
2. Create a new file named `.env`
3. Copy and paste this content:

```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

**SAVE THE FILE** (Ctrl + S)

---

### Phase 3: Install Dependencies

1. Open Command Prompt
2. Navigate to project root:
   ```bash
   cd C:\path\to\your\project
   ```
3. Run:
   ```bash
   npm install
   ```
4. Wait for completion (this installs all packages)

---

### Phase 4: Start the Servers

**NOW YOU HAVE TWO OPTIONS:**

#### EASIEST WAY - Double-click a Batch File:

In your project root, double-click: **`start-dev.bat`**

This will:
- ✅ Automatically open 2 new terminals
- ✅ Start backend on port 3001
- ✅ Start frontend on port 5173
- ✅ Just wait for "ready" messages

#### MANUAL WAY - Open 3 Terminals:

**Terminal 1 (MongoDB):**
```bash
mongod
```
Wait for: `waiting for connections on port 27017`

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```
Wait for: `ContentPulse server running on port 3001`

**Terminal 3 (Frontend):**
```bash
cd frontend
npm run dev
```
Wait for: `ready in 500 ms` or `Local: http://localhost:5173`

---

### Phase 5: Open in Browser

Once both backend and frontend show "ready" messages:

1. Open: **http://localhost:5173**
2. You should see the ContentPulse dashboard
3. If page is blank or has errors, check browser console (F12)

---

## TROUBLESHOOTING

### Problem 1: "Cannot connect to MongoDB"

**Solution:**
1. Check if Terminal 1 has `mongod` running
2. Look for message: `waiting for connections on port 27017`
3. If not running, open new Command Prompt and run: `mongod`

### Problem 2: "EADDRINUSE: address already in use :::3001"

Means port 3001 is busy.

**Solution:**
```bash
# Find what's using port 3001
netstat -ano | findstr :3001

# Kill it (replace <PID> with the number shown)
taskkill /PID <PID> /F

# Then try again
cd backend
npm run dev
```

### Problem 3: "EADDRINUSE: address already in use :::5173"

Means port 5173 is busy.

**Solution:**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Problem 4: "Module not found" or "Cannot find module"

**Solution:**
```bash
# Delete all node_modules
rmdir /s /q node_modules
rmdir /s /q backend\node_modules
rmdir /s /q frontend\node_modules
rmdir /s /q shared\node_modules

# Reinstall
npm install
```

### Problem 5: Page loads but shows nothing / blank page

**Solution:**
1. Press F12 to open Developer Console
2. Check for red errors
3. Look for network tab - check if API calls work
4. Make sure backend is running on port 3001

### Problem 6: "npm: command not found"

Node.js is not installed or not in PATH.

**Solution:**
1. Download Node.js: https://nodejs.org/
2. Install it
3. Restart Command Prompt
4. Try again

### Problem 7: ".env file not found" error

**Solution:**
1. Make sure you created both files:
   - `backend/.env`
   - `frontend/.env`
2. Make sure files are in the right folders
3. Run `diagnose.bat` to check file structure

---

## QUICK DIAGNOSTIC SCRIPT

To check if everything is set up correctly, double-click: **`diagnose.bat`**

This will tell you:
- ✅ If Node.js is installed
- ✅ If MongoDB is running
- ✅ If environment files exist
- ✅ If dependencies are installed
- ✅ If ports are available

---

## WHAT EACH PORT DOES

| Port | Service | URL | Purpose |
|------|---------|-----|---------|
| 3001 | Backend API | http://localhost:3001/api | Node.js/Express server |
| 5173 | Frontend | http://localhost:5173 | React development server |
| 27017 | MongoDB | mongodb://localhost:27017 | Database |

---

## TESTING THE API

Once backend is running, test in Command Prompt:

```bash
# Health check
curl http://localhost:3001/api/health

# Create test content
curl -X POST http://localhost:3001/api/content ^
  -H "Content-Type: application/json" ^
  -d "{\"title\": \"Test\", \"url\": \"http://test.com\", \"format\": \"article\", \"topic\": \"Tech\", \"length\": 1000, \"publishedAt\": \"2024-01-15T10:00:00Z\", \"channels\": [\"blog\"]}"
```

---

## EXPECTED CONSOLE OUTPUT

### MongoDB (mongod):
```
[initandlisten] MongoDB starting
[initandlisten] waiting for connections on port 27017
```

### Backend (npm run dev):
```
> ts-node src/index.ts
[timestamp] info: ContentPulse server running on port 3001
[timestamp] info: Connected to MongoDB
[timestamp] info: WebSocket server running on port 3001
```

### Frontend (npm run dev):
```
VITE v4.5.14  ready in 363 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## SUCCESS CHECKLIST

Before opening browser, confirm ALL of these:

- [ ] MongoDB terminal shows `waiting for connections on port 27017`
- [ ] Backend terminal shows `ContentPulse server running on port 3001`
- [ ] Frontend terminal shows `http://localhost:5173`
- [ ] backend/.env exists with MONGODB_URI
- [ ] frontend/.env exists with VITE_API_URL
- [ ] All three terminals have no red error messages

**If ALL checked, open browser to: http://localhost:5173**

---

## QUICK START FILES IN YOUR PROJECT

- `start-dev.bat` - Fastest way to start (double-click)
- `diagnose.bat` - Check system setup
- `QUICK_START.md` - Detailed text guide
- `run-dev.bat` - Alternative startup script
- `run-dev.ps1` - PowerShell startup (advanced)

---

## 30-SECOND QUICK START

Assuming MongoDB is running:

1. Open Command Prompt in project root
2. Run: `npm install`
3. Double-click: `start-dev.bat`
4. Wait for "ready" messages
5. Open: http://localhost:5173

**DONE!**

---

## IF YOU GET STUCK

Run this first:
```bash
diagnose.bat
```

It will tell you exactly what's wrong. Then:

1. If MongoDB error → Start MongoDB with `mongod`
2. If port error → Kill process: `taskkill /PID <number> /F`
3. If files missing → Create backend/.env and frontend/.env
4. If modules error → Run `npm install` again

---

## FINAL CHECKLIST BEFORE ASKING FOR HELP

- [ ] MongoDB is running (`mongod` command in terminal)
- [ ] backend/.env created with MONGODB_URI
- [ ] frontend/.env created with VITE_API_URL
- [ ] `npm install` completed without errors
- [ ] Both backend and frontend terminals show no red errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Ran `diagnose.bat` and all checks passed

**If YES to all: Your setup is correct!**

---

**Enjoy ContentPulse! 🚀**
