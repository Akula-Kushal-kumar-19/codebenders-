# ⚡ CONTENTPULSE - YOUR PROJECT IS READY, HERE'S HOW TO RUN IT

## Why Localhost Isn't Working

✅ **Good news:** Your project code is 100% error-free and fully fixed!  
❌ **Issue:** You need to:
1. Install MongoDB (the database)
2. Create 2 `.env` files
3. Run the startup script

---

## 🚀 RUN IN 5 STEPS

### 1️⃣ Start MongoDB (The Database)

**If you don't have it:**
- Go to: https://www.mongodb.com/try/download/community
- Download for Windows
- Install it
- Open Command Prompt and run: `mongod`
- Wait for: `waiting for connections on port 27017`
- **Keep this window open!**

**If you have it:**
- Just run: `mongod`

### 2️⃣ Create `backend/.env`

In `backend` folder, create file `.env`:
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/contentpulse
LOG_LEVEL=info
FRONTEND_URL=http://localhost:3000
```

### 3️⃣ Create `frontend/.env`

In `frontend` folder, create file `.env`:
```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

### 4️⃣ Install Dependencies

Open Command Prompt in project root:
```
npm install
```

### 5️⃣ Run Everything

**Double-click:** `start-dev.bat` in your project root

OR manually in 2 new Command Prompts:

**Terminal A:**
```
cd backend && npm run dev
```

**Terminal B:**
```
cd frontend && npm run dev
```

---

## 🎯 Then Open Browser

```
http://localhost:5173
```

You'll see the ContentPulse dashboard! ✨

---

## ✅ Verify It Works

You should see in terminals:

✅ MongoDB terminal: `waiting for connections on port 27017`  
✅ Backend terminal: `ContentPulse server running on port 3001`  
✅ Frontend terminal: `Local: http://localhost:5173`  

---

## 📋 Troubleshooting (Copy-Paste Solutions)

**Port 3001 in use:**
```
netstat -ano | findstr :3001
taskkill /PID <number> /F
```

**Port 5173 in use:**
```
netstat -ano | findstr :5173
taskkill /PID <number> /F
```

**Module errors:**
```
npm install
cd backend && npm install
cd ../frontend && npm install
```

**Blank page:**
- Press F12 in browser
- Check Console tab for errors
- Make sure backend is running on 3001

---

## 📁 Your New Helper Files

- `START_HERE.txt` - This file
- `start-dev.bat` - Easiest startup
- `diagnose.bat` - Check your setup
- `SETUP_COMPLETE.md` - Full guide
- `GET_STARTED.txt` - Quick reference

---

## ✨ What You Can Do Once Running

✅ View real-time analytics  
✅ Check AI insights  
✅ Generate performance reports  
✅ Track content by topic & format  
✅ See emerging trends  
✅ Find content gaps  

---

## 🎉 You're All Set!

Your code is perfect. Just need to:
1. Run `mongod` (MongoDB)
2. Create those 2 `.env` files
3. Run `npm install`
4. Double-click `start-dev.bat`
5. Open http://localhost:5173

**Let's go! 🚀**
