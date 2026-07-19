# Monitoring & Observability Setup Guide

## Overview
This guide provides instructions for setting up monitoring, logging, alerting, and observability for the ContentPulse system.

## 1. Application Logging

### Winston Logger (Already Configured)
The system uses Winston for structured logging. Configuration is in `backend/src/utils/logger.ts`.

#### Log Levels
- `error` - Application errors
- `warn` - Warning messages
- `info` - Information messages
- `debug` - Debug information

#### Log Output
- **Development**: Console output with colors
- **Production**: File output (error.log, combined.log)
- **Format**: JSON with timestamps

#### Using Logger
```typescript
import logger from './utils/logger';

logger.info('Message', { context: 'data' });
logger.error('Error occurred', { error: err });
logger.warn('Warning message', { details: 'additional info' });
```

### Log Files
- `error.log` - Errors only
- `combined.log` - All logs
- Rotate logs using `winston-daily-rotate-file` package (add to backend/package.json)

## 2. Performance Monitoring

### New Relic Setup (Recommended)

#### Installation
```bash
cd backend
npm install newrelic
```

#### Configuration (newrelic.js)
```javascript
exports.config = {
  app_name: ['ContentPulse'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  },
  transaction_tracer: {
    enabled: true
  },
  error_collector: {
    enabled: true
  }
};
```

#### Usage in backend/src/index.ts
```typescript
// Add at the very top
import newrelic from 'newrelic';
```

#### Metrics to Monitor
- Request response times
- Database query performance
- Memory usage
- CPU usage
- Error rates
- Throughput

### DataDog Alternative
```bash
npm install dd-trace
```

```typescript
import tracer from 'dd-trace';
tracer.init();
```

## 3. Error Tracking

### Sentry Setup (Recommended)

#### Installation
```bash
cd backend
npm install @sentry/node @sentry/tracing
```

#### Configuration (backend/src/index.ts)
```typescript
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: config.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ trusted: true }),
    new Tracing.Integrations.Express({
      app: true,
      request: true,
    }),
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

app.use(Sentry.Handlers.errorHandler());
```

#### Usage
```typescript
try {
  // code
} catch (error) {
  Sentry.captureException(error);
}
```

## 4. Health Checks & Uptime Monitoring

### Health Check Endpoint
Already implemented: `GET /api/health`

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Enhanced Health Check
Create `backend/src/routes/healthRoutes.ts`:
```typescript
import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    
    res.json({
      status: 'ok',
      timestamp: new Date(),
      database: dbStatus,
      memory: {
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      },
      uptime: `${process.uptime()} seconds`,
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
```

### Uptime Monitoring Services
- **Pingdom**: https://www.pingdom.com
- **StatusPage.io**: https://www.statuspage.io
- **UptimeRobot**: https://uptimerobot.com
- **Freshworks**: https://www.freshworks.com/website-monitoring/

Configure to check: `https://yourdomain.com/api/health` every 5 minutes

## 5. Metrics & Analytics

### Prometheus Integration (Advanced)

#### Installation
```bash
npm install prom-client
```

#### Setup in backend/src/utils/metrics.ts
```typescript
import promClient from 'prom-client';

// Create metrics
export const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

export const databaseOperationDuration = new promClient.Histogram({
  name: 'db_operation_duration_seconds',
  help: 'Duration of database operations',
  labelNames: ['operation', 'collection'],
});
```

#### Express Middleware
```typescript
import { httpRequestDuration, httpRequestTotal } from './utils/metrics';

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  
  next();
});
```

#### Metrics Endpoint
```typescript
import promClient from 'prom-client';

app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});
```

### Grafana Dashboards
Connect Prometheus to Grafana for visualization:
- CPU usage
- Memory usage
- Request rates
- Error rates
- Database performance
- API latency

## 6. Database Monitoring

### MongoDB Monitoring

#### Enable MongoDB Profiling
```javascript
// In MongoDB shell
db.setProfilingLevel(1, { slowms: 100 })
```

#### View Slow Queries
```javascript
db.system.profile.find().sort({ ts: -1 }).limit(10)
```

#### MongoDB Atlas Monitoring (Cloud)
1. Log into MongoDB Atlas
2. Go to Monitoring
3. View:
   - Connections
   - Operations
   - Query performance
   - Replication lag
   - Storage usage

#### Query Optimization
```typescript
// Always use indexes
// Create compound indexes for common queries
db.contents.createIndex({ topic: 1, format: 1 })
db.analytics.createIndex({ contentId: 1, date: -1 })
```

## 7. Frontend Monitoring

### Browser Monitoring with Sentry

#### Installation
```bash
cd frontend
npm install @sentry/react @sentry/tracing
```

#### Setup in frontend/src/main.tsx
```typescript
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const App = Sentry.withProfiler(AppComponent);
```

### Google Analytics (Frontend)

#### Installation
```bash
npm install react-ga4
```

#### Setup
```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

// Track page views
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

// Track events
ReactGA.event({
  category: 'report',
  action: 'generate',
  label: 'biweekly',
});
```

### WebVitals Monitoring
```bash
npm install web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 8. Alerting Setup

### Alert Rules

#### Error Rate Alert
- Trigger: Error rate > 5% for 5 minutes
- Action: Notify team in Slack

#### Performance Alert
- Trigger: API response time > 2 seconds for 10 minutes
- Action: Page on-call engineer

#### Database Alert
- Trigger: Query time > 5 seconds
- Action: Log in error channel

#### Memory Alert
- Trigger: Memory usage > 80%
- Action: Alert ops team

### Notification Channels

#### Slack Integration
```typescript
// In monitoring service
const sendSlackAlert = async (message: string) => {
  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: message,
    channel: '#alerts',
  });
};
```

#### Email Alerts
Configure via monitoring service (New Relic, DataDog, etc.)

#### SMS Alerts
Critical alerts: Use Twilio integration

#### PagerDuty
For on-call rotation and escalation

## 9. Log Aggregation

### ELK Stack (Elasticsearch, Logstash, Kibana)

#### Docker Compose Setup
```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"

  app:
    build: ./backend
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=debug
    depends_on:
      - logstash
```

#### Backend Logging to Logstash
```bash
npm install winston-logstash-tcp
```

```typescript
import WinstonLogstash from 'winston-logstash-tcp';

logger.add(new WinstonLogstash({
  host: 'localhost',
  port: 5000,
}));
```

#### Kibana Dashboards
1. Create index pattern: `contentpulse-*`
2. Visualize:
   - Error logs
   - Request rates
   - API performance
   - Database queries

### CloudWatch (AWS)

#### Send Logs to CloudWatch
```bash
npm install winston-cloudwatch
```

```typescript
import WinstonCloudWatch from 'winston-cloudwatch';

logger.add(new WinstonCloudWatch({
  logGroupName: '/contentpulse/backend',
  logStreamName: `${environment}-${new Date().toISOString().split('T')[0]}`,
  awsRegion: 'us-east-1',
}));
```

## 10. Performance Profiling

### Node.js Profiling

#### Using clinic.js
```bash
npm install -g clinic
clinic doctor -- npm start
```

#### Memory Profiling
```bash
node --inspect backend/dist/index.js
# Then use Chrome DevTools (chrome://inspect)
```

### Database Performance

#### Analyze Slow Queries
```javascript
db.system.profile.aggregate([
  { $match: { millis: { $gt: 100 } } },
  { $group: { _id: '$ns', count: { $sum: 1 }, avgTime: { $avg: '$millis' } } },
  { $sort: { avgTime: -1 } }
])
```

#### Index Usage
```javascript
db.collection.aggregate([
  { $indexStats: {} }
])
```

## 11. Documentation

### API Documentation
Already provided in `API_DOCUMENTATION.md`

### Status Page
Create public status page at `/status` or use StatusPage.io

```typescript
app.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    services: {
      api: 'operational',
      database: 'operational',
      analytics_sync: 'operational',
    },
  });
});
```

### Runbooks
Create runbooks for:
- Handling database failover
- Scaling during high load
- Rolling deployments
- Emergency procedures
- Incident response

### Architecture Documentation
Already provided in `ARCHITECTURE.md`

## 12. Dashboards to Create

### Operations Dashboard
- Uptime
- Error rates
- Response times
- Database metrics
- Active users
- Revenue impact

### Business Dashboard
- Content performance
- Engagement metrics
- Conversion rates
- Topic trends
- Audience growth

### Technical Dashboard
- API latency
- Database performance
- Error logs
- Memory usage
- Request volume

## 13. Checklist for Monitoring Setup

- [ ] Enable Winston logging
- [ ] Configure log rotation
- [ ] Set up Sentry for error tracking
- [ ] Configure New Relic or DataDog
- [ ] Set up Prometheus metrics
- [ ] Create Grafana dashboards
- [ ] Configure Slack alerts
- [ ] Set up MongoDB profiling
- [ ] Enable query logging
- [ ] Create health check monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Create operational dashboards
- [ ] Document alert procedures
- [ ] Test incident response

## 14. Cost Estimation

### Monitoring Services (Monthly)
- **Sentry**: Free to $29/month
- **New Relic**: Free to $500+/month
- **DataDog**: $15 to $50+/month
- **MongoDB Atlas**: $57/month (M10+)
- **Prometheus/Grafana**: Free (self-hosted)
- **StatusPage.io**: Free to $100+/month

## 15. SLA & Targets

### Availability
- **Target**: 99.9% uptime
- **Acceptable Downtime**: 43 minutes/month

### Performance
- **API Response Time**: < 200ms (p95)
- **Database Query Time**: < 100ms (p95)
- **Page Load Time**: < 2s (p75)

### Error Rates
- **Target**: < 0.1% error rate
- **Alert Threshold**: > 1% for 5 minutes

## Next Steps

1. Start with Winston logger (already configured)
2. Add Sentry for error tracking
3. Set up basic uptime monitoring
4. Configure Slack alerts
5. Create operational dashboards
6. Document incident procedures
7. Test monitoring system
8. Schedule regular review of metrics

## Additional Resources

- [Winston Logger](https://github.com/winstonjs/winston)
- [Sentry Documentation](https://docs.sentry.io)
- [Prometheus Guide](https://prometheus.io/docs)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards)
- [MongoDB Profiling](https://docs.mongodb.com/manual/tutorial/manage-the-database-profiler)
- [New Relic Docs](https://docs.newrelic.com)
- [DataDog Docs](https://docs.datadoghq.com)
