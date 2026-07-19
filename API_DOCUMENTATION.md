# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, no authentication is required. For production, implement JWT-based authentication.

## Response Format
All responses follow this format:
```json
{
  "success": true,
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Endpoints

### Content Management

#### Create Content
```http
POST /api/content
Content-Type: application/json

{
  "title": "10 Tips for Better Content",
  "url": "https://example.com/tips",
  "format": "article",
  "topic": "Content Strategy",
  "subtopics": ["Best Practices", "SEO"],
  "length": 1500,
  "publishedAt": "2024-01-15T10:00:00Z",
  "channels": ["blog", "newsletter"],
  "author": "Jane Doe",
  "description": "Essential tips for content creators"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "10 Tips for Better Content",
    "url": "https://example.com/tips",
    ...
  }
}
```

#### List Content
```http
GET /api/content?page=1&limit=20&topic=Content%20Strategy&format=article
```

Query Parameters:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `topic` (string): Filter by topic
- `format` (string): Filter by format (article|video|newsletter|social|podcast|infographic)

#### Get Content Details
```http
GET /api/content/{id}
```

#### Get Content Performance
```http
GET /api/content/{id}/performance?startDate=2024-01-01&endDate=2024-01-31
```

Query Parameters:
- `startDate` (ISO date): Start of date range
- `endDate` (ISO date): End of date range

#### Update Content
```http
PUT /api/content/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "topic": "New Topic",
  "channels": ["blog", "twitter"]
}
```

#### Delete Content
```http
DELETE /api/content/{id}
```

### Analytics

#### Record Analytics Data
```http
POST /api/analytics
Content-Type: application/json

{
  "contentId": "uuid",
  "channel": "google_analytics",
  "date": "2024-01-15",
  "views": 1250,
  "engagement": 85,
  "timeOnPage": 245,
  "conversions": 12,
  "clickThroughRate": 0.068
}
```

#### Get Analytics Summary
```http
GET /api/analytics/summary?startDate=2024-01-01&endDate=2024-01-31
```

Response:
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31"
    },
    "totalContent": 45,
    "totalViews": 125000,
    "totalEngagement": 8500,
    "avgTimeOnPage": 185,
    "avgConversionRate": 0.025,
    "topTopics": [...],
    "topFormats": [...]
  }
}
```

#### Get Topic Performance
```http
GET /api/analytics/topics?limit=10
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "topic": "Content Strategy",
      "count": 12,
      "avgViews": 5420,
      "avgEngagement": 380,
      "avgTimeOnPage": 220,
      "conversionRate": 0.032
    }
  ]
}
```

#### Get Format Performance
```http
GET /api/analytics/formats?limit=5
```

#### Sync Channels
```http
POST /api/analytics/sync
```

Response:
```json
{
  "success": true,
  "message": "Analytics sync initiated"
}
```

### AI & Insights

#### Get Content Performance Predictions
```http
POST /api/analysis/predictions
Content-Type: application/json

{
  "title": "New Article Title",
  "format": "article",
  "topic": "Content Strategy",
  "length": 2000
}
```

Response:
```json
{
  "success": true,
  "data": {
    "title": "New Article Title",
    "format": "article",
    "topic": "Content Strategy",
    "length": 2000,
    "predictedViews": 4850,
    "predictedEngagement": 320,
    "predictedConversionRate": 0.029,
    "confidence": 0.82,
    "factors": [
      {
        "factor": "Content format (article)",
        "impact": "positive",
        "magnitude": 0.1,
        "explanation": "article content typically performs better in this category"
      }
    ]
  }
}
```

#### Get Insights
```http
GET /api/analysis/insights
```

Response:
```json
{
  "success": true,
  "data": {
    "highConvertingTopics": [...],
    "emergingTrends": [...],
    "contentGaps": [...]
  }
}
```

#### Get Content Gaps
```http
GET /api/analysis/gaps
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "topic": "Video Marketing",
      "searchVolume": 15000,
      "opportunity": 25.0,
      "reason": "High engagement but limited content coverage",
      "priority": "high",
      "identifiedAt": "2024-01-15T10:00:00Z",
      "suggestedContent": {
        "title": "Ultimate Guide to Video Marketing",
        "format": "article",
        "keywords": ["video marketing", "video marketing guide"]
      }
    }
  ]
}
```

#### Get High-Converting Topics
```http
GET /api/analysis/topics?limit=5
```

#### Get Emerging Trends
```http
GET /api/analysis/trends
```

### Reports

#### Generate Report
```http
POST /api/reports
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "generatedAt": "2024-01-15T10:00:00Z",
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-14"
    },
    "recommendations": [...],
    "insights": [...],
    "trends": [...],
    "topTopics": [...],
    "bestFormats": [...],
    "contentGaps": [...],
    "audienceInsights": [...],
    "trafficSourceAnalysis": [...],
    "nextActions": [...]
  }
}
```

#### Get Latest Report
```http
GET /api/reports/latest
```

#### List Reports
```http
GET /api/reports?page=1&limit=10
```

#### Get Report by ID
```http
GET /api/reports/{id}
```

### Health Check

#### Health Status
```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

## WebSocket Events

Connect to: `ws://localhost:3001`

### Subscribe to Updates
```json
{
  "type": "subscribe",
  "channel": "analytics"
}
```

### Analytics Update Event
```json
{
  "type": "analytics_update",
  "contentId": "uuid",
  "metrics": {
    "views": 1250,
    "engagement": 85,
    "timeOnPage": 245
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Report Generated Event
```json
{
  "type": "report_generated",
  "reportId": "uuid",
  "period": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-14"
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

## Rate Limiting

Currently not implemented. For production:
- Implement rate limiting per IP/user
- Consider using `express-rate-limit`
- Configure appropriate limits for different endpoints

## Pagination

List endpoints support pagination:
- `page`: Page number (1-indexed)
- `limit`: Items per page (max 100)
- Response includes pagination metadata

## Sorting

Default sorting:
- Content: `publishedAt` (descending)
- Analytics: `date` (descending)
- Reports: `generatedAt` (descending)

## Filtering

Supported filters:
- Content: `topic`, `format`
- Analytics: `startDate`, `endDate`, `channel`

## Date Formats

All dates use ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`

## Content Formats

Supported content formats:
- `article` - Blog posts, articles
- `video` - Video content
- `newsletter` - Email newsletters
- `social` - Social media posts
- `podcast` - Podcast episodes
- `infographic` - Infographics

## Channels

Supported analytics channels:
- `google_analytics`
- `youtube`
- `medium`
- `linkedin`
- `twitter`
- `substack`

## Metrics

### Content Metrics
- `views` - Number of page views
- `engagement` - Likes, shares, comments
- `timeOnPage` - Average seconds spent on page
- `conversions` - Number of conversions
- `clickThroughRate` - CTR (0-1 range)
- `bounceRate` - Bounce rate (0-1 range)
- `socialShares` - Number of social shares
- `comments` - Number of comments

## Error Codes

- `VALIDATION_ERROR` - 400 - Invalid request data
- `NOT_FOUND` - 404 - Resource not found
- `INTERNAL_ERROR` - 500 - Server error

## Best Practices

1. **Pagination**: Always use pagination for list endpoints
2. **Date Ranges**: Include start/end dates for analytics queries
3. **Caching**: Cache frequently accessed data on client
4. **Batch Operations**: Use batch endpoints when available
5. **Error Handling**: Always check `success` field and handle errors
6. **WebSocket**: Use WebSocket for real-time updates instead of polling
