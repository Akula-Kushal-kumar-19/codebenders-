import mongoose from 'mongoose';
import { IReport, Recommendation, Insight, Trend, TopicRecommendation, FormatRecommendation, ContentGap, AudienceInsight, TrafficSourceAnalysis, NextAction } from '@contentpulse/shared';

const recommendationSchema = new mongoose.Schema<Recommendation>({
  priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  expectedImpact: String,
  confidenceScore: { type: Number, min: 0, max: 1 },
}, { _id: false });

const insightSchema = new mongoose.Schema<Insight>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  data: mongoose.Schema.Types.Mixed,
  supportingMetrics: [String],
}, { _id: false });

const trendSchema = new mongoose.Schema<Trend>({
  name: { type: String, required: true },
  direction: { type: String, enum: ['up', 'down', 'stable'], required: true },
  magnitude: Number,
  startDate: Date,
  endDate: Date,
}, { _id: false });

const topicRecommendationSchema = new mongoose.Schema<TopicRecommendation>({
  rank: Number,
  topic: { type: String, required: true },
  avgViews: Number,
  avgEngagement: Number,
  conversionRate: Number,
  confidence: Number,
}, { _id: false });

const formatRecommendationSchema = new mongoose.Schema<FormatRecommendation>({
  rank: Number,
  format: { type: String, required: true },
  avgViews: Number,
  avgEngagement: Number,
  conversionRate: Number,
}, { _id: false });

const contentGapSchema = new mongoose.Schema<ContentGap>({
  id: { type: String, required: true },
  topic: { type: String, required: true },
  format: String,
  searchVolume: Number,
  reason: String,
  priority: { type: String, enum: ['high', 'medium', 'low'] },
  identifiedAt: Date,
  suggestedContent: String,
}, { _id: false });

const audienceInsightSchema = new mongoose.Schema<AudienceInsight>({
  type: { type: String, enum: ['geography', 'device', 'behavior'] },
  description: String,
  data: mongoose.Schema.Types.Mixed,
}, { _id: false });

const trafficSourceAnalysisSchema = new mongoose.Schema<TrafficSourceAnalysis>({
  source: String,
  traffic: Number,
  conversion: Number,
  avgSessionDuration: Number,
}, { _id: false });

const nextActionSchema = new mongoose.Schema<NextAction>({
  action: { type: String, required: true },
  priority: { type: String, enum: ['high', 'medium', 'low'] },
  dueDate: Date,
  owner: String,
}, { _id: false });

const reportSchema = new mongoose.Schema<IReport>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    generatedAt: {
      type: Date,
      required: true,
      default: () => new Date(),
      index: true,
    },
    period: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    recommendations: [recommendationSchema],
    insights: [insightSchema],
    trends: [trendSchema],
    topTopics: [topicRecommendationSchema],
    bestFormats: [formatRecommendationSchema],
    contentGaps: [contentGapSchema],
    audienceInsights: [audienceInsightSchema],
    trafficSourceAnalysis: [trafficSourceAnalysisSchema],
    nextActions: [nextActionSchema],
  },
  {
    timestamps: true,
    collection: 'reports',
  }
);

reportSchema.index({ generatedAt: -1 });
reportSchema.index({ 'period.startDate': 1, 'period.endDate': 1 });

export const ReportModel = mongoose.model<IReport>('Report', reportSchema);
