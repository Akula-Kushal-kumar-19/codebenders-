# 🎯 EXACT COMMANDS TO START & VERIFY SERVERS

## ✅ CURRENTLY RUNNING - Both Servers Active Now!

---

## 📋 TO REPLICATE THIS SETUP

### Terminal 1: Start Backend Server

```bash
cd backend
node dist/index.js
```

**Expected Output:**
```
✅ Connected to MongoDB
✅ Scheduled tasks initialized
✅ ContentPulse server running on port 3001
✅ Environment: development
✅ WebSocket server running on port 3001
```

**Status**: Server ready to receive requests

---

### Terminal 2: Start Frontend Server

```bash
cd frontend/dist
python -m http.server 4173
```

**Expected Output:**
```
Serving HTTP on :: port 4173 (http://[::]:4173/) ...
```

**Status**: Frontend application is now being served

---

## ✅ VERIFY SERVERS ARE WORKING

### Terminal 3: Test Backend API

```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{"status":"ok","timestamp":"2026-07-19T16:58:37.612Z"}
```

---

### Test Additional APIs

```bash
# Analytics Summary
curl http://localhost:3001/api/analytics/summary

# AI Insights
curl http://localhost:3001/api/analysis/insights

# Content List
curl http://localhost:3001/api/content
```

---

### Test Frontend Server

```bash
curl -I http://localhost:4173
```

**Expected Response:**
```
HTTP/1.0 200 OK
Content-type: text/html
Content-Length: 512
```

---

## 🌐 OPEN APPLICATION IN BROWSER

### Main Application URL
```
http://localhost:4173
```

### Alternative URLs (All Same)
```
http://127.0.0.1:4173
http://localhost:4173/
```

---

## 📊 ALL SERVER ENDPOINTS

### Health & System
```bash
GET http://localhost:3001/api/health
```

### Content Management
```bash
GET http://localhost:3001/api/content
POST http://localhost:3001/api/content
GET http://localhost:3001/api/content/:id
PUT http://localhost:3001/api/content/:id
DELETE http://localhost:3001/api/content/:id
GET http://localhost:3001/api/content/:id/performance
```

### Analytics
```bash
GET http://localhost:3001/api/analytics/summary
GET http://localhost:3001/api/analytics/topics
GET http://localhost:3001/api/analytics/formats
POST http://localhost:3001/api/analytics/sync
POST http://localhost:3001/api/analytics
```

### AI Analysis
```bash
GET http://localhost:3001/api/analysis/insights
GET http://localhost:3001/api/analysis/gaps
GET http://localhost:3001/api/analysis/topics
GET http://localhost:3001/api/analysis/trends
POST http://localhost:3001/api/analysis/predictions
```

### Reports
```bash
GET http://localhost:3001/api/reports
POST http://localhost:3001/api/reports
GET http://localhost:3001/api/reports/:id
GET http://localhost:3001/api/reports/latest
```

---

## 🔧 IF SERVERS DON'T START

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart backend
cd backend
node dist/index.js
```

### Issue: npm install missing

**Solution:**
```bash
cd backend
npm install
npm run build
node dist/index.js

cd ../frontend
npm install
npm run build
# Then serve dist folder
```

### Issue: Python not found

**Alternative: Use Node HTTP Server**
```bash
cd frontend
npm install -g http-server
http-server dist -p 4173
```

---

## 🎯 COMPLETE STARTUP SEQUENCE

```bash
# Step 1: Kill any old processes on ports 3001 and 4173
netstat -ano | findstr :3001
netstat -ano | findstr :4173
# Note PIDs and kill if needed

# Step 2: Ensure builds exist
cd backend
npm run build

cd ../frontend
npm run build

# Step 3: Start backend (Terminal 1)
cd backend
node dist/index.js
# Wait for "server running on port 3001"

# Step 4: Start frontend (Terminal 2)
cd frontend/dist
python -m http.server 4173
# Wait for "Serving HTTP on :: port 4173"

# Step 5: Verify (Terminal 3)
curl http://localhost:3001/api/health
curl http://localhost:4173

# Step 6: Open browser
# Visit: http://localhost:4173
```

---

## 📝 QUICK REFERENCE COMMANDS

```bash
# Build everything
cd backend && npm run build && cd ../frontend && npm run build

# Check if ports are available
netstat -ano | findstr :3001
netstat -ano | findstr :4173

# Test backend
curl http://localhost:3001/api/health

# Test frontend
curl http://localhost:4173

# View backend logs
type backend/combined.log
type backend/error.log

# Stop backend (if needed)
# Just close the terminal or press Ctrl+C

# Stop frontend (if needed)
# Just close the terminal or press Ctrl+C
```

---

## ✅ COMPLETE SOLUTION SUMMARY

| Step | Command | Port | Status |
|------|---------|------|--------|
| 1 | `cd backend; node dist/index.js` | 3001 | 🟢 Running |
| 2 | `cd frontend/dist; python -m http.server 4173` | 4173 | 🟢 Running |
| 3 | Open browser to `http://localhost:4173` | - | ✅ Ready |

---

## 🎊 CURRENT STATUS

✅ Backend Running: http://localhost:3001  
✅ Frontend Running: http://localhost:4173  
✅ Both Verified Working  
✅ Ready to Use Now  

---

**To Restart Both Servers Later:**

1. Kill processes or close terminals
2. Run these commands again:
   - Terminal 1: `cd backend; node dist/index.js`
   - Terminal 2: `cd frontend/dist; python -m http.server 4173`
3. Open browser to: http://localhost:4173

**That's it!** 🚀
