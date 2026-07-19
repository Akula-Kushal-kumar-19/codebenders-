# ContentPulse - System Architecture Diagram

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL DATA SOURCES                        │
├─────────────────────────────────────────────────────────────────────┤
│  Google Analytics │ YouTube │ LinkedIn │ Twitter/X │ Medium │Substack│
└────────────┬────────────────────────────────────────────────────┬───┘
             │                                                    │
             │ [Scheduled every 6 hours]                         │
             ▼                                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      BACKEND API SERVER (Node.js)                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AnalyticsAggregationService                                  │ │
│  │  └─ Syncs data from 6 platforms                              │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  PerformanceAnalysisService                                   │ │
│  │  ├─ Analyze by Topic                                         │ │
│  │  ├─ Analyze by Format (article/video/newsletter...)          │ │
│  │  ├─ Analyze by Length (word count brackets)                  │ │
│  │  └─ Analyze by Segment (geography/device/traffic)            │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  AIInsightsService                                            │ │
│  │  ├─ Predict content performance                              │ │
│  │  ├─ Identify high-converting topics                          │ │
│  │  ├─ Detect emerging trends                                   │ │
│  │  ├─ Find content gaps                                        │ │
│  │  └─ Generate natural language insights                       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  ReportGenerationService                                      │ │
│  │  └─ Generate bi-weekly reports [Scheduled every 14 days]     │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
│                              ▼                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Express Controllers & Routes (30+ Endpoints)                │ │
│  │  ├─ Content CRUD (6)           │ Reports (4)                 │ │
│  │  ├─ Analytics (5)              │ Health (1)                  │ │
│  │  └─ AI Analysis (5)            │ WebSocket (1)               │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                              │                                       │
└──────────────┬───────────────┼───────────────┬──────────────────────┘
               │ REST API      │ WebSocket     │ Real-time Events
               │ (HTTP)        │ (WS)          │ (Analytics Update,
               │               │               │  Report Generated)
               ▼               ▼               ▼
┌─────────────────────────────────────────────────────┐
│                  MONGODB DATABASE                   │
├─────────────────────────────────────────────────────┤
│ ├─ Contents Collection        (articles, videos)   │
│ ├─ Analytics Collection       (metrics, KPIs)      │
│ ├─ AnalysisPeriods Collection (computed analysis)  │
│ ├─ Reports Collection         (generated reports)  │
│ └─ ContentGaps Collection     (opportunities)      │
└─────────────────────────────────────────────────────┘
               │
               │
               ▼
┌──────────────────────────────────────────────────────┐
│              FRONTEND DASHBOARD (React)              │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Navigation Bar                              │  │
│  │  Dashboard │ Analytics │ Insights │ Reports │  │
│  └──────────────────────────────────────────────┘  │
│                      │                              │
│      ┌───────────────┼───────────────┬────────┐   │
│      ▼               ▼               ▼        ▼   │
│  ┌────────┐  ┌──────────────┐ ┌────────┐ ┌──────┐│
│  │Dashboard│  │  Analytics   │ │Insights│ │Report││
│  │         │  │              │ │        │ │      ││
│  │ KPI     │  │ Topic Perf.  │ │High    │ │List  ││
│  │ Cards   │  │ Format Perf. │ │Convert │ │View  ││
│  │ Charts  │  │ Tables       │ │Trends  │ │Export││
│  │ Date    │  │ Filters      │ │Gaps    │ │      ││
│  │Range    │  │ Sync Control │ │AI Recs │ │Gener-││
│  │         │  │              │ │        │ │ate   ││
│  └────────┘  └──────────────┘ └────────┘ └──────┘│
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │  Components: MetricCard, Charts, Tables      │  │
│  │  Hooks: useWebSocket, useFetch               │  │
│  │  State: Zustand Store                        │  │
│  │  HTTP: Axios API Client                      │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
               │
               │ REST API + WebSocket
               │
               ▼
        User's Browser
       (http://localhost:3000)
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ EXTERNAL ANALYTICS PLATFORMS                                   │
│ [Google Analytics, YouTube, LinkedIn, Twitter/X, Medium, Substack]
└──────────────────────────┬──────────────────────────────────────┘
                           │
                [Scheduled: Every 6 Hours]
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │ AnalyticsAggregationService          │
        │                                      │
        │ syncGoogleAnalytics()                │
        │ syncYouTubeAnalytics()               │
        │ syncLinkedInAnalytics()              │
        │ syncTwitterAnalytics()               │
        │ syncSubstackAnalytics()              │
        │ syncMediumAnalytics()                │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ MongoDB: Analytics Collection        │
        │ (views, engagement, conversions...) │
        └──────────────┬───────────────────────┘
                       │
                [Trigger: New Analytics]
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ PerformanceAnalysisService           │
        │                                      │
        │ analyzePeriod()                      │
        │ ├─ analyzeByTopic()                 │
        │ ├─ analyzeByFormat()                │
        │ ├─ analyzeByLength()                │
        │ └─ analyzeBySegment()               │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ MongoDB: AnalysisPeriods Collection  │
        │ (computed metrics by dimension)     │
        └──────────────┬───────────────────────┘
                       │
                [Trigger: New Analysis]
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ AIInsightsService                    │
        │                                      │
        │ identifyHighConvertingTopics()       │
        │ detectEmergingTrends()               │
        │ findContentGaps()                    │
        │ predictContentPerformance()          │
        └──────────────┬───────────────────────┘
                       │
                [Scheduled: Every 14 Days]
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ ReportGenerationService              │
        │                                      │
        │ generateBiWeeklyReport()             │
        │ ├─ Top recommendations              │
        │ ├─ High-converting topics           │
        │ ├─ Best formats                     │
        │ ├─ Content gaps                     │
        │ └─ Next actions                     │
        └──────────────┬───────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │ MongoDB: Reports Collection          │
        │ (bi-weekly intelligence reports)   │
        └──────────────┬───────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    REST API      WebSocket      Frontend
    (Fetch)       (Real-time)     (Display)
         │             │             │
         └─────────────┼─────────────┘
                       │
                       ▼
            React Dashboard UI
            ├─ Dashboard Page (real-time)
            ├─ Analytics Page (breakdown)
            ├─ Insights Page (AI-powered)
            └─ Reports Page (bi-weekly)
```

---

## API Request/Response Flow

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│                                                          │
│  onClick → API Client (axios)                           │
└───────────────────┬──────────────────────────────────────┘
                    │
                    │ HTTP Request
                    │ GET/POST/PUT/DELETE
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                  EXPRESS SERVER                          │
│                                                          │
│  Route Handler                                          │
│    ├─ contentRoutes      /api/content/*               │
│    ├─ analyticsRoutes    /api/analytics/*             │
│    ├─ aiRoutes          /api/analysis/*              │
│    └─ reportRoutes      /api/reports/*               │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                    CONTROLLER                            │
│                                                          │
│  ContentController.getById()                            │
│  AnalyticsController.getSummary()                       │
│  AIController.getPredictions()                          │
│  ReportController.getLatest()                           │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                         │
│                                                          │
│  AnalyticsAggregationService.getContentAnalytics()    │
│  PerformanceAnalysisService.getTopicPerformance()     │
│  AIInsightsService.identifyHighConvertingTopics()     │
│  ReportGenerationService.getLatestReport()            │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                    MONGODB QUERY                         │
│                                                          │
│  ContentModel.findOne({ id })                          │
│  AnalyticsModel.find({ contentId, date })             │
│  ReportModel.findOne().sort({ generatedAt: -1 })      │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                  MONGODB DATABASE                        │
│                                                          │
│  Returns document(s)                                    │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                  SERVICE LAYER                           │
│                                                          │
│  Process/transform data                                 │
│  Calculate metrics/aggregations                         │
│  Format response                                        │
└───────────────────┬──────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│                   CONTROLLER                             │
│                                                          │
│  res.json({ success: true, data: {...} })             │
└───────────────────┬──────────────────────────────────────┘
                    │
                    │ HTTP Response
                    │ 200 OK
                    │
                    ▼
┌──────────────────────────────────────────────────────────┐
│              FRONTEND (React Component)                  │
│                                                          │
│  Update state with response                             │
│  Render UI with new data                                │
│  Display charts/tables                                  │
└──────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
Frontend Components:

┌─────────────────────────────────────────────────────┐
│                    App.tsx                          │
│  (Main component with routing logic)               │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
      ┌──────────────────────────┐
      │    Navigation            │
      │ (Dashboard|Analytics|..)│
      └──────────────────────────┘
                 │
    ┌────┴────┬────┴────┬────┴────┐
    ▼         ▼         ▼         ▼
┌────────┐┌──────────┐┌───────┐┌──────┐
│Dashboard││Analytics││Insights││Reports
│         ││          ││        ││      │
│MetricCard
│ ├─ Card   ││ Table   ││ Alert  ││ List │
│ ├─ Chart  ││ Buttons ││ Trends ││ View │
│ └─ Value  ││ Filters ││ Recs   ││ Export
│         ││          ││        ││      │
└────────┘└──────────┘└───────┘└──────┘


Core Components:
┌──────────────────────────────────────────┐
│ Charts Module                            │
├──────────────────────────────────────────┤
│ ├─ MetricCard        (KPI display)      │
│ ├─ BarChartComponent (bar charts)       │
│ ├─ LineChartComponent (line charts)     │
│ └─ PieChartComponent (pie charts)       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Common Module                            │
├──────────────────────────────────────────┤
│ ├─ Alert            (notifications)     │
│ ├─ LoadingSpinner   (loading state)     │
│ └─ Table            (data tables)       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Layout Module                            │
├──────────────────────────────────────────┤
│ ├─ Navigation       (top nav bar)       │
│ └─ PageHeader       (page headers)      │
└──────────────────────────────────────────┘

Custom Hooks:
┌──────────────────────────────────────────┐
│ useWebSocket (WebSocket integration)   │
│ useFetch (Data fetching with error)    │
└──────────────────────────────────────────┘
```

---

## Deployment Architecture

```
Development:
┌─────────────────────────────────────────┐
│ Local Machine                           │
├─────────────────────────────────────────┤
│ npm run dev                             │
│ ├─ Backend: localhost:3001             │
│ ├─ Frontend: localhost:3000            │
│ └─ MongoDB: localhost:27017            │
└─────────────────────────────────────────┘

Production (Docker):
┌─────────────────────────────────────────┐
│ Docker Containers                       │
├─────────────────────────────────────────┤
│ ├─ Backend Container                   │
│ │  ├─ Node.js runtime                 │
│ │  ├─ Express server (3001)           │
│ │  └─ WebSocket server                │
│ │                                      │
│ ├─ Frontend Container                  │
│ │  ├─ Nginx web server (80/443)       │
│ │  └─ React static files              │
│ │                                      │
│ └─ MongoDB Container                   │
│    └─ Database (27017)                 │
└─────────────────────────────────────────┘
         │         │         │
         └────┬────┴────┬────┘
              │         │
              ▼         ▼
    Docker Network  Volumes
    (containers     (data
     communicate)   persistence)

Production (Cloud):
┌──────────────────────────────────────────┐
│ AWS / Heroku / DigitalOcean            │
├──────────────────────────────────────────┤
│ ├─ API Gateway / Load Balancer         │
│ │  └─ Route traffic to backend         │
│ │                                       │
│ ├─ EC2/Compute Instances               │
│ │  └─ Run Express server               │
│ │                                       │
│ ├─ S3 / CDN                            │
│ │  └─ Serve static frontend files      │
│ │                                       │
│ ├─ MongoDB Atlas / RDS                 │
│ │  └─ Managed database                 │
│ │                                       │
│ └─ CloudWatch / Monitoring             │
│    └─ Logs and metrics                 │
└──────────────────────────────────────────┘
```

---

## Technology Stack Diagram

```
┌────────────────────────────────────────────────────────┐
│                   FRONTEND STACK                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  React 18  ──>  TypeScript  ──>  Vite Build          │
│      ↓                              ↓                  │
│  Components                    JavaScript/CSS         │
│    ├─ Pages (4)                   Bundling           │
│    ├─ Charts                                          │
│    └─ Tables                                          │
│                                                        │
│  State Management               Styling              │
│    Zustand  ──────────>      Tailwind CSS 3          │
│                              Lucide Icons             │
│                                                        │
│  HTTP Client                   WebSocket             │
│    Axios   ────────────>   ws (native/auto)          │
│                                                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   BACKEND STACK                         │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Node.js 18+  ──>  TypeScript  ──>  Build (tsc)     │
│      ↓                              ↓                │
│  Runtime                      JavaScript             │
│    ├─ Event Loop                Compiled             │
│    ├─ Modules                                        │
│    └─ npm packages                                   │
│                                                        │
│  Express.js 4                  Request Handling      │
│    ├─ Router                   ├─ Parse JSON         │
│    ├─ Middleware               ├─ Validate Input     │
│    └─ Controllers              └─ Error Handling     │
│                                                        │
│  MongoDB 4.4+ / Mongoose       Database             │
│    ├─ Collections              ├─ Indexes           │
│    ├─ Documents                ├─ Queries           │
│    └─ Aggregation              └─ Transactions      │
│                                                        │
│  WebSocket (ws)                Logging              │
│    ├─ Real-time updates        Winston Logger       │
│    ├─ Bi-directional           ├─ Error logs        │
│    └─ Low latency              ├─ Info logs         │
│                                └─ Debug logs        │
│                                                        │
│  Scheduling (node-cron)        AI Integration       │
│    ├─ 6-hour sync              ├─ OpenAI API       │
│    └─ 14-day reports           └─ Claude API       │
│                                                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                    TYPE SAFETY                         │
├────────────────────────────────────────────────────────┤
│  TypeScript 5                                         │
│    ├─ Full strict mode                               │
│    ├─ Shared types (shared/src/index.ts)            │
│    └─ End-to-end type coverage                       │
│        ├─ Frontend → API → Backend → Database        │
│        └─ Compile-time error detection              │
└────────────────────────────────────────────────────────┘
```

---

## Data Model Relationships

```
Content Collection
├─ id (PK)
├─ title
├─ format ──────────┐
├─ topic ───────┐   │
└─ publishedAt  │   │
               │   │
               │   ▼
Analytics Collection
├─ id (PK)
├─ contentId ────────> Content.id (FK)
├─ channel
├─ date
├─ views
├─ engagement
├─ timeOnPage
├─ conversions
└─ clickThroughRate

AnalysisPeriods Collection
├─ id (PK)
├─ startDate
├─ endDate
├─ performanceByTopic
│  ├─ topic (ref: Content.topic)
│  ├─ avgViews
│  └─ conversionRate
├─ performanceByFormat
│  ├─ format (ref: Content.format)
│  └─ metrics...
└─ performanceBySegment

Reports Collection
├─ id (PK)
├─ period
│  ├─ startDate
│  └─ endDate
├─ recommendations[]
├─ insights[]
├─ topTopics[] (refs: Content)
├─ contentGaps[]
└─ nextActions[]

ContentGaps Collection
├─ id (PK)
├─ topic (ref: Content.topic)
├─ searchVolume
├─ priority
└─ suggestedContent
```

---

This completes the ContentPulse architecture documentation! 🎉
