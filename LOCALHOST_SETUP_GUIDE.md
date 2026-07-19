# 🚀 ContentPulse - Complete Localhost Setup Guide

## **MAIN APPLICATION URLs**

### **📊 Frontend (with all changes integrated)**
```
http://localhost:5173
```

### **🔌 Backend API (with mock data)**
```
http://localhost:3001/api
```

### **💻 Direct Backend Server**
```
http://localhost:3001
```

---

## **All Features Available on Main Link**

### **Main Frontend Link**: `http://localhost:5173`

This includes ALL the enhancements:

✅ **Dashboard Page** - Real-time analytics
  - Analytics summary with mock data (14 content items, 70 analytics records)
  - Topic performance charts
  - Format performance charts
  - Channel performance analysis
  
✅ **Analytics Page** - Detailed metrics
  - View all 70 analytics records
  - Topic performance breakdown (12 topics)
  - Format performance (article, video, newsletter, social)
  - Channel analytics (blog, linkedin, twitter, youtube, newsletter)
  - **NEW: Search rankings, bounce rate, social shares, comments**
  
✅ **Insights Page** - AI-powered analysis
  - High converting topics
  - Emerging trends
  - Content gaps
  - Recommendations
  - All powered by mock data
  
✅ **Reports Page** - Generated reports
  - View reports
  - Generate new reports
  - Filter by period

✅ **Mock Data Features**:
  - ✅ 14 content items (10 original + 4 new)
  - ✅ 70 analytics records (enhanced with 4 new fields)
  - ✅ All fields: searchRankings, bounceRate, socialShares, comments
  - ✅ Realistic metrics across all dimensions
  - ✅ Complete topic and channel coverage

---

## **Quick Start Instructions**

### **Terminal 1: Start Backend**
```bash
cd backend
npm install
npm start
```
✅ Runs on: `http://localhost:3001`

### **Terminal 2: Start Frontend**
```bash
cd frontend
npm install
npm run dev
```
✅ Runs on: `http://localhost:5173`

### **Open in Browser**
```
http://localhost:5173
```

---

## **API Endpoints (from http://localhost:3001/api)**

### **Content Endpoints**
- `GET /content` - List all content (uses mock data)
- `GET /content/:id` - Get specific content
- `POST /content` - Create new content
- `PUT /content/:id` - Update content
- `DELETE /content/:id` - Delete content

### **Analytics Endpoints**
- `GET /analytics/summary` - Summary stats with enhanced mock data
- `GET /analytics/topics` - Topic performance (12 topics)
- `GET /analytics/formats` - Format performance (4 formats)
- `POST /analytics` - Record analytics
- `POST /analytics/sync` - Sync channels

### **Analysis Endpoints (AI/Insights)**
- `GET /analysis/insights` - Get insights
- `GET /analysis/gaps` - Content gaps
- `GET /analysis/topics` - High converting topics
- `GET /analysis/trends` - Emerging trends
- `POST /analysis/predictions` - Get predictions

### **Reports Endpoints**
- `GET /reports` - List reports
- `GET /reports/latest` - Latest report
- `GET /reports/:id` - Specific report
- `POST /reports` - Generate new report

---

## **Mock Data Summary**

### **Content Data (14 items)**
```
Topics: React, Node.js, TypeScript, Web Performance, GraphQL, 
        JavaScript, CSS, DevOps (2), AI/ML, Cloud, Python, Web Dev

Formats: Article (9), Video (3), Newsletter (1), Social (1)

Channels: Blog, LinkedIn, Twitter, YouTube, Newsletter
```

### **Analytics Data (70 records)**
```
5 records per content item × 14 items = 70 records

Fields per record:
- id, contentId, channel, date
- views, engagement, timeOnPage, conversions, clickThroughRate
- searchRankings, bounceRate, socialShares, comments
```

### **Metrics Summary**
```
Total Views: ~165,220
Total Engagement: ~21,920
Total Social Shares: ~7,400
Total Comments: ~1,450
Average CTR: 15%
Average Bounce Rate: 33%
```

---

## **Database Configuration**

### **MongoDB (Optional)**
```
Default: mongodb://localhost:27017/contentpulse
```

**Note**: If MongoDB is not running, the app automatically falls back to **mock data** ✅

### **Mock Data Fallback (Automatic)**
```
If MongoDB unavailable → Uses mock data automatically
No setup required → Start frontend and it works!
```

---

## **Environment Variables**

### **Backend (.env)**
```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/contentpulse
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

### **Frontend (.env)**
```
VITE_API_URL=http://localhost:3001/api
```

---

## **Browser DevTools**

### **Check Network Requests**
```
http://localhost:3001/api/analytics/summary - Gets mock analytics
http://localhost:3001/api/content - Lists 14 mock content items
http://localhost:3001/api/analytics/topics - Topic performance
```

### **Check Local Storage**
```
Dashboard state and preferences stored locally
All analytics data comes from mock data
```

---

## **Troubleshooting**

### **Port 5173 already in use?**
```bash
# Backend will auto-increment to next available port
# Check console for actual port
```

### **Port 3001 already in use?**
```bash
# Server automatically tries 3002, 3003, etc.
# Check console logs for actual port
```

### **Can't connect to API?**
```
Check: http://localhost:3001/api/health
Should return: { success: true }
```

### **No data showing?**
```
✅ Mock data automatically loads if no MongoDB
✅ Check browser console for errors
✅ Refresh the page
```

---

## **Complete Application Flow**

```
Browser
  ↓
http://localhost:5173 (React Frontend)
  ↓
Vite dev server (port 5173)
  ↓
API Proxy → http://localhost:3001/api
  ↓
Express Backend (port 3001)
  ↓
Mock Data Service
  ├─ 14 Content Items
  └─ 70 Analytics Records
```

---

## **What's New in This Session**

✅ **Added 4 New Content Items**
- Kubernetes in Production
- Web Accessibility Best Practices
- Python Data Science Toolkit
- Next.js Performance Tips

✅ **Added 4 New Analytics Fields**
- searchRankings (keyword rankings)
- bounceRate (user bounce %)
- socialShares (social engagement)
- comments (content engagement)

✅ **70 Total Analytics Records**
- Each with all 12 fields
- Realistic metrics across all dimensions
- Ready for comprehensive testing

---

## **Quick Access Links**

| Service | URL | Port |
|---------|-----|------|
| **Frontend** | http://localhost:5173 | 5173 |
| **Backend** | http://localhost:3001 | 3001 |
| **API Base** | http://localhost:3001/api | 3001 |
| **WebSocket** | ws://localhost:3001 | 3001 |
| **Database** | mongodb://localhost:27017 | 27017 |

---

## **Final Note**

🎉 **All mock data changes are fully integrated and ready to use!**

Simply open: **`http://localhost:5173`**

All features, analytics, reports, and AI insights will use the enhanced mock data with:
- 14 content items
- 70 analytics records
- 4 new analytics fields
- Realistic metrics across all dimensions

**No additional configuration needed!** ✅

---

**Created**: Today
**Status**: ✅ Ready for Testing
**Data**: Mock Data (Fallback Enabled)
