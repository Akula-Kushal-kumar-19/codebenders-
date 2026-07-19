# 🎯 EXACT TERMINAL COMMANDS - COPY & PASTE READY

## ✅ FOLLOW THESE EXACT STEPS

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### **OPTION 1: RECOMMENDED - Production Build (Fastest)**

#### **Terminal 1: Start Backend**

Copy and paste this EXACTLY:

```bash
cd backend
node dist/index.js
```

**Press Enter**

You should see:
```
✅ Connected to MongoDB
✅ ContentPulse server running on port 3001
✅ WebSocket server running on port 3001
```

**✅ Leave this terminal open and running**

---

#### **Terminal 2: Start Frontend**

Open a NEW terminal window and copy & paste this EXACTLY:

```bash
cd frontend/dist
python -m http.server 4173
```

**Press Enter**

You should see:
```
Serving HTTP on :: port 4173 (http://[::]:4173/) ...
```

**✅ Leave this terminal open and running**

---

### **STEP 3: Open Application in Browser**

Copy this URL and paste into your browser address bar:

```
http://localhost:4173
```

**OR click this link (if your system supports it):**
```
http://localhost:4173
```

**Press Enter** and wait 5-10 seconds for the application to load.

---

## ✅ WHAT YOU SHOULD SEE

### In Browser (After ~10 seconds):

1. **ContentPulse header** appears
2. **Navigation menu** shows 4 links:
   - Dashboard
   - Analytics
   - Insights
   - Reports
3. **Dashboard page** displays:
   - Metric cards
   - Charts
   - Date range filters
4. **All elements interactive** - buttons, links, filters respond

---

## 🔧 ALTERNATIVE OPTION 2: Development Mode (If you prefer)

### **Terminal 1: Backend Development**

```bash
cd backend
npm run dev
```

---

### **Terminal 2: Frontend Development**

```bash
cd frontend
npm run dev
```

Then open:
```
http://localhost:5173
```

---

## ✅ VERIFICATION COMMANDS

### **Terminal 3 (Optional): Test Backend API**

Open a third terminal and test the API:

```bash
curl http://localhost:3001/api/health
```

You should see:
```json
{"status":"ok","timestamp":"2026-07-19T..."}
```

---

### **Test More Endpoints**

```bash
curl http://localhost:3001/api/analytics/summary
curl http://localhost:3001/api/analysis/insights
```

---

## 🎯 QUICK REFERENCE - COPY EXACTLY

### **For Windows PowerShell:**

**Terminal 1:**
```powershell
cd backend; node dist/index.js
```

**Terminal 2:**
```powershell
cd frontend/dist; python -m http.server 4173
```

---

### **For Mac/Linux Terminal:**

**Terminal 1:**
```bash
cd backend && node dist/index.js
```

**Terminal 2:**
```bash
cd frontend/dist && python -m http.server 4173
```

---

## 📍 EXACT URLS TO USE

### Application URLs:
```
http://localhost:4173
http://127.0.0.1:4173
```

### API URLs (for testing):
```
http://localhost:3001/api/health
http://localhost:3001/api/analytics/summary
http://localhost:3001/api/analysis/insights
```

---

## ⏳ TIMING

| Step | Time | Action |
|------|------|--------|
| 1 | 0 sec | Start backend terminal |
| 2 | 3 sec | Backend ready |
| 3 | 3 sec | Start frontend terminal |
| 4 | 2 sec | Frontend ready |
| 5 | 5 sec | Open browser |
| 6 | 10 sec | Application loads |
| **Total** | **~30 seconds** | **Full setup** |

---

## 🆘 TROUBLESHOOTING

### **If Backend Doesn't Start**

Port already in use. Run:

```bash
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

Then try again:
```bash
cd backend
node dist/index.js
```

---

### **If Frontend Shows "Cannot GET /"**

Try alternative URL:
```
http://127.0.0.1:4173
```

Or check Python is installed:
```bash
python --version
```

---

### **If Application Loads Blank**

1. Refresh page (F5)
2. Clear cache (Ctrl+Shift+Delete)
3. Try alternative URL above

---

## ✅ CHECKLIST WHILE COMMANDS RUN

**Terminal 1 (Backend):**
- [ ] No errors shown
- [ ] Shows "server running on port 3001"
- [ ] Shows "Connected to MongoDB"
- [ ] Shows "WebSocket server running"

**Terminal 2 (Frontend):**
- [ ] No errors shown
- [ ] Shows "Serving HTTP on :: port 4173"
- [ ] Ready to serve

**Browser (http://localhost:4173):**
- [ ] Page starts loading
- [ ] Dashboard appears after ~5-10 seconds
- [ ] Menu shows 4 pages
- [ ] Charts display
- [ ] Can click buttons

---

## 🎊 FINAL STATUS

Once everything is running:

```
✅ Backend: Running on http://localhost:3001
✅ Frontend: Running on http://localhost:4173
✅ Application: Fully functional
✅ Ready: For immediate use
```

---

## 📌 KEEP TERMINALS OPEN

**IMPORTANT:**
- Do NOT close either terminal window
- Closing = stops the servers
- Servers stay running as long as windows open
- You can minimize them if you want

---

**Now run the commands above and open http://localhost:4173 in your browser!** 🚀
