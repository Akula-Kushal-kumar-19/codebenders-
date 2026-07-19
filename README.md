# ContentPulse: Content Performance & Editorial Intelligence System

A comprehensive AI-powered content analytics and intelligence platform that helps editorial teams make data-driven decisions about content creation, optimization, and distribution.

## Features

### 🎯 Core Features
- **Multi-Channel Analytics Aggregation**: Collect metrics from Google Analytics, YouTube, LinkedIn, Twitter/X, Medium, and Substack
- **Performance Analysis Engine**: Analyze content by topic, format, length, and audience segment
- **AI-Powered Insights**: Machine learning-driven recommendations on content strategy
- **Content Gap Analysis**: Identify high-demand topics with insufficient coverage
- **Predictive Analytics**: Forecast content performance based on historical patterns
- **Bi-Weekly Reports**: Automated intelligence reports with actionable recommendations
- **Real-Time Dashboard**: Live metrics and performance tracking
- **WebSocket Updates**: Real-time analytics updates via WebSocket

### 📊 Analysis Capabilities
- Topic performance ranking
- Content format comparison
- Article length optimization
- Audience segment analysis
- Traffic source breakdown
- Conversion rate tracking
- Engagement metrics
- Time-on-page patterns

### 🤖 AI Features
- High-converting topic identification
- Emerging trend detection
- Content gap discovery
- Performance prediction
- Natural language insights
- Confidence scoring

## Architecture

### Project Structure
```
contentpulse/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/      # Configuration
│   │   ├── models/      # MongoDB schemas
│   │   ├── controllers/ # Route handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Express middleware
│   │   ├── utils/       # Utilities & helpers
│   │   └── index.ts     # Server entry point
│   ├── .env.example     # Environment variables template
│   └── package.json
├── frontend/            # React dashboard
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   ├── hooks/       # Custom hooks
│   │   ├── store/       # Zustand store
│   │   ├── utils/       # Utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── shared/              # Shared TypeScript types
│   ├── src/
│   │   └── index.ts     # Type definitions
│   └── package.json
└── package.json         # Root package.json
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Task Scheduling**: node-cron
- **WebSocket**: ws
- **AI Integration**: OpenAI, Anthropic Claude
- **HTTP Client**: Axios
- **Logging**: Winston

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charting**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Shared
- **Type Safety**: TypeScript
- **Package Manager**: npm workspaces

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB >= 4.4
- npm >= 8

### Installation

1. **Clone the repository** (or copy the files to your project directory)

2. **Install dependencies**
```bash
npm install
```

This installs dependencies for the root, backend, frontend, and shared packages.

3. **Set up environment variables**

Create `.env` files in backend and frontend directories:

**backend/.env**
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/contentpulse
LOG_LEVEL=info

# AI Services (optional)
OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key

# Channel APIs (optional)
GOOGLE_ANALYTICS_KEY=your_google_analytics_key
YOUTUBE_API_KEY=your_youtube_api_key
MEDIUM_API_TOKEN=your_medium_api_token
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
SUBSTACK_API_KEY=your_substack_api_key

FRONTEND_URL=http://localhost:3000
```

**frontend/.env**
```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

### Running the Application

**Development mode** (runs both backend and frontend):
```bash
npm run dev
```

**Backend only**:
```bash
npm run dev:backend
```

**Frontend only**:
```bash
npm run dev:frontend
```

**Production build**:
```bash
npm run build
npm start
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- WebSocket: ws://localhost:3001

## Database Schema

### Content Collection
```typescript
{
  id: string,
  title: string,
  url: string,
  format: 'article' | 'video' | 'newsletter' | 'social' | 'podcast' | 'infographic',
  topic: string,
  subtopics: string[],
  length: number,  // words
  publishedAt: Date,
  channels: string[],
  author?: string,
  description?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Analytics Collection
```typescript
{
  id: string,
  contentId: string,
  channel: string,
  date: Date,
  views: number,
  engagement: number,
  timeOnPage: number,  // seconds
  conversions: number,
  clickThroughRate: number,  // 0-1
  searchRankings?: number[],
  bounceRate?: number,
  socialShares?: number,
  comments?: number,
  createdAt: Date
}
```

### Report Collection
```typescript
{
  id: string,
  generatedAt: Date,
  period: { startDate: Date, endDate: Date },
  recommendations: Recommendation[],
  insights: Insight[],
  trends: Trend[],
  topTopics: TopicRecommendation[],
  bestFormats: FormatRecommendation[],
  contentGaps: ContentGap[],
  audienceInsights: AudienceInsight[],
  trafficSourceAnalysis: TrafficSourceAnalysis[],
  nextActions: NextAction[]
}
```

## API Endpoints

### Content Management
- `POST /api/content` - Create new content
- `GET /api/content` - List content (paginated)
- `GET /api/content/:id` - Get content details
- `GET /api/content/:id/performance` - Get content performance metrics
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Analytics
- `POST /api/analytics` - Record analytics data
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/topics` - Get topic performance
- `GET /api/analytics/formats` - Get format performance
- `POST /api/analytics/sync` - Sync all channels

### AI Analysis
- `POST /api/analysis/predictions` - Get content performance predictions
- `GET /api/analysis/insights` - Get AI insights
- `GET /api/analysis/gaps` - Get content gaps
- `GET /api/analysis/topics` - Get high-converting topics
- `GET /api/analysis/trends` - Get emerging trends

### Reports
- `POST /api/reports` - Generate new report
- `GET /api/reports/latest` - Get latest report
- `GET /api/reports` - List all reports (paginated)
- `GET /api/reports/:id` - Get report by ID

### Health Check
- `GET /api/health` - Health check endpoint

## Dashboard Features

### Dashboard Page
- Real-time metrics cards (views, engagement, time on page)
- Topic performance chart
- Format performance comparison
- Date range filtering

### Analytics Page
- Topic-by-topic performance breakdown
- Format performance metrics
- Channel sync control
- Detailed metrics tables

### Insights Page
- High-converting topic recommendations
- Emerging trend detection
- Content gap identification
- Confidence scoring

### Reports Page
- Bi-weekly report generation
- Report history and browsing
- Detailed report viewing
- PDF/CSV export (template ready)

## Scheduled Tasks

The system includes automatic scheduled tasks:

- **Analytics Sync**: Every 6 hours - Syncs data from all configured channels
- **Report Generation**: Every 14 days - Generates bi-weekly performance reports

These can be customized in `backend/src/index.ts`.

## WebSocket Events

Real-time updates via WebSocket:

```typescript
// Analytics Update
{
  type: 'analytics_update',
  contentId: string,
  metrics: IAnalytics,
  timestamp: Date
}

// Report Generated
{
  type: 'report_generated',
  reportId: string,
  period: { startDate: Date, endDate: Date },
  timestamp: Date
}
```

## Advanced Features

### Performance Prediction
```typescript
// Predicts content performance based on format, topic, and length
POST /api/analysis/predictions
{
  title: string,
  format: ContentFormat,
  topic: string,
  length: number
}
```

### Content Gap Detection
Automatically identifies:
- High search volume topics with no content
- Topics with engagement but low content count
- Underperforming format-topic combinations

### AI Insights
- Analyzes historical performance patterns
- Identifies trends and anomalies
- Generates natural language insights
- Provides confidence scores for all recommendations

## Configuration

### Environment Variables

**Backend Configuration**
- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `LOG_LEVEL` - Winston log level (default: info)
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `CLAUDE_API_KEY` - Anthropic Claude API key (optional)

**Channel API Keys**
- `GOOGLE_ANALYTICS_KEY` - Google Analytics 4 property key
- `YOUTUBE_API_KEY` - YouTube Data API key
- `MEDIUM_API_TOKEN` - Medium integration token
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn API token
- `TWITTER_API_KEY` - Twitter API v2 key
- `TWITTER_API_SECRET` - Twitter API secret
- `SUBSTACK_API_KEY` - Substack API key

### Report Intervals
- `REPORT_GENERATION_INTERVAL` - Bi-weekly (14 days)
- `ANALYTICS_SYNC_INTERVAL` - 6 hours

## Logging

Winston logger configured with:
- Console output in development
- File logging (error.log, combined.log)
- Structured JSON format
- Request logging middleware

## Error Handling

Custom error handling with:
- Validation error responses
- Standardized error format
- Request context in logs
- Graceful error recovery

## TypeScript Support

Full TypeScript support throughout:
- Strict type checking enabled
- Shared type definitions
- Path aliases (`@/*`)
- Type-safe API client

## Performance Optimization

- MongoDB indexes on frequently queried fields
- Pagination on list endpoints
- Efficient data aggregation
- Caching-ready architecture
- WebSocket for real-time updates

## Next Steps for Production

1. **Configure Channel APIs**: Set up API credentials for analytics integrations
2. **Set up AI Services**: Configure OpenAI or Claude API keys for advanced insights
3. **SSL/HTTPS**: Set up SSL certificates for production deployment
4. **Database Backup**: Implement MongoDB backup strategy
5. **Monitoring**: Set up application monitoring and alerting
6. **Authentication**: Add user authentication and authorization
7. **Rate Limiting**: Implement API rate limiting
8. **Caching**: Add Redis caching for improved performance

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify firewall/network settings

### Port Already in Use
- Change PORT in backend `.env`
- Change port in frontend `vite.config.ts`

### WebSocket Connection Fails
- Check VITE_WS_URL in frontend `.env`
- Verify server is running
- Check browser console for errors

### Missing Dependencies
- Run `npm install` from root directory
- Run `npm install` in each package directory

## Support & Documentation

For detailed API documentation, see individual route files:
- `backend/src/routes/contentRoutes.ts`
- `backend/src/routes/analyticsRoutes.ts`
- `backend/src/routes/aiRoutes.ts`
- `backend/src/routes/reportRoutes.ts`

## License

MIT

## Contributing

Contributions are welcome! Please ensure TypeScript compilation passes and code follows the established patterns.
