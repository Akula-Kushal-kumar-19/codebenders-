// Content Model Types
export interface IContent {
  id: string;
  title: string;
  url: string;
  format: ContentFormat;
  topic: string;
  subtopics?: string[];
  length: number; // in words
  publishedAt: Date;
  channels: string[]; // e.g., ['blog', 'twitter', 'linkedin']
  author?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ContentFormat = 'article' | 'video' | 'newsletter' | 'social' | 'podcast' | 'infographic';

// Analytics Model Types
export interface IAnalytics {
  id: string;
  contentId: string;
  channel: string; // e.g., 'google_analytics', 'youtube', 'linkedin'
  date: Date;
  views: number;
  engagement: number; // likes, shares, comments
  timeOnPage: number; // in seconds
  conversions: number;
  clickThroughRate: number; // 0-1
  searchRankings?: number[];
  bounceRate?: number;
  socialShares?: number;
  comments?: number;
  createdAt: Date;
}

// Analysis Period Types
export interface IAnalysisPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  performanceByTopic: TopicPerformance[];
  performanceByFormat: FormatPerformance[];
  performanceByLength: LengthPerformance[];
  performanceBySegment: SegmentPerformance[];
  createdAt: Date;
}

export interface TopicPerformance {
  topic: string;
  count: number;
  avgViews: number;
  avgEngagement: number;
  avgTimeOnPage: number;
  conversionRate: number;
  growthRate?: number;
}

export interface FormatPerformance {
  format: ContentFormat;
  count: number;
  avgViews: number;
  avgEngagement: number;
  avgTimeOnPage: number;
  conversionRate: number;
}

export interface LengthPerformance {
  lengthBracket: string; // e.g., '0-500', '500-1000', '1000+'
  count: number;
  avgViews: number;
  avgEngagement: number;
  avgTimeOnPage: number;
  conversionRate: number;
}

export interface SegmentPerformance {
  segment: string; // geography, traffic source, device
  segmentType: 'geography' | 'trafficSource' | 'device';
  value: string;
  views: number;
  engagement: number;
  conversionRate: number;
}

// Report Types
export interface IReport {
  id: string;
  generatedAt: Date;
  period: {
    startDate: Date;
    endDate: Date;
  };
  recommendations: Recommendation[];
  insights: Insight[];
  trends: Trend[];
  topTopics: TopicRecommendation[];
  bestFormats: FormatRecommendation[];
  contentGaps: ContentGap[];
  audienceInsights: AudienceInsight[];
  trafficSourceAnalysis: TrafficSourceAnalysis[];
  nextActions: NextAction[];
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  type: string;
  description: string;
  expectedImpact: string;
  confidenceScore: number; // 0-1
}

export interface Insight {
  title: string;
  description: string;
  data: any;
  supportingMetrics: string[];
}

export interface Trend {
  name: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number; // percentage change
  startDate: Date;
  endDate: Date;
}

export interface TopicRecommendation {
  rank: number;
  topic: string;
  avgViews: number;
  avgEngagement: number;
  conversionRate: number;
  confidence: number;
}

export interface FormatRecommendation {
  rank: number;
  format: ContentFormat;
  avgViews: number;
  avgEngagement: number;
  conversionRate: number;
}

export interface ContentGap {
  id: string;
  topic: string;
  format?: ContentFormat;
  searchVolume: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  identifiedAt: Date;
  suggestedContent?: string;
}

export interface AudienceInsight {
  type: 'geography' | 'device' | 'behavior';
  description: string;
  data: any;
}

export interface TrafficSourceAnalysis {
  source: string;
  traffic: number;
  conversion: number;
  avgSessionDuration: number;
}

export interface NextAction {
  action: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  owner?: string;
}

// Content Gap Types
export interface IContentGap {
  id: string;
  topic: string;
  format?: ContentFormat;
  searchVolume?: number;
  competition?: number;
  opportunity: number; // search volume / competition
  reason: string;
  priority: 'high' | 'medium' | 'low';
  identifiedAt: Date;
  suggestedContent?: {
    title: string;
    format: ContentFormat;
    keywords: string[];
  };
}

// Prediction Types
export interface IContentPrediction {
  contentId?: string;
  title: string;
  format: ContentFormat;
  topic: string;
  length: number;
  predictedViews: number;
  predictedEngagement: number;
  predictedConversionRate: number;
  confidence: number;
  factors: PredictionFactor[];
}

export interface PredictionFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  magnitude: number;
  explanation: string;
}

// API Request/Response Types
export interface AnalyticsSummaryResponse {
  period: {
    startDate: Date;
    endDate: Date;
  };
  totalContent: number;
  totalViews: number;
  totalEngagement: number;
  avgTimeOnPage: number;
  avgConversionRate: number;
  topTopics: TopicPerformance[];
  topFormats: FormatPerformance[];
}

export interface ContentPerformanceResponse {
  content: IContent;
  analytics: IAnalytics[];
  summary: {
    totalViews: number;
    totalEngagement: number;
    avgTimeOnPage: number;
    conversionRate: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// AI/ML Types
export interface AIInsightRequest {
  period: {
    startDate: Date;
    endDate: Date;
  };
  analysisType: 'trends' | 'gaps' | 'predictions' | 'recommendations';
  topics?: string[];
  formats?: ContentFormat[];
}

export interface AIInsightResponse {
  insights: Insight[];
  recommendations: Recommendation[];
  predictions?: IContentPrediction[];
  confidence: number;
  generatedAt: Date;
}

// Channel Integration Types
export interface ChannelConfig {
  name: string;
  type: 'google_analytics' | 'youtube' | 'medium' | 'linkedin' | 'twitter' | 'substack';
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  propertyId?: string;
  accountId?: string;
  enabled: boolean;
  lastSyncAt?: Date;
  syncInterval: number; // in hours
}

// WebSocket Event Types
export interface AnalyticsUpdateEvent {
  type: 'analytics_update';
  contentId: string;
  metrics: Partial<IAnalytics>;
  timestamp: Date;
}

export interface ReportGeneratedEvent {
  type: 'report_generated';
  reportId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  timestamp: Date;
}

export interface WebSocketMessage {
  event: AnalyticsUpdateEvent | ReportGeneratedEvent;
  timestamp: Date;
}

// Error Types
export interface APIError {
  code: string;
  message: string;
  statusCode: number;
  details?: any;
}

export class ContentPulseError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ContentPulseError';
  }
}
