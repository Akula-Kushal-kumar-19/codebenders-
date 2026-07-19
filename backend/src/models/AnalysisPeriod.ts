import mongoose from 'mongoose';
import { IAnalysisPeriod, TopicPerformance, FormatPerformance, LengthPerformance, SegmentPerformance } from '@contentpulse/shared';

const topicPerformanceSchema = new mongoose.Schema<TopicPerformance>({
  topic: { type: String, required: true },
  count: { type: Number, default: 0 },
  avgViews: { type: Number, default: 0 },
  avgEngagement: { type: Number, default: 0 },
  avgTimeOnPage: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  growthRate: Number,
}, { _id: false });

const formatPerformanceSchema = new mongoose.Schema<FormatPerformance>({
  format: { type: String, required: true },
  count: { type: Number, default: 0 },
  avgViews: { type: Number, default: 0 },
  avgEngagement: { type: Number, default: 0 },
  avgTimeOnPage: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
}, { _id: false });

const lengthPerformanceSchema = new mongoose.Schema<LengthPerformance>({
  lengthBracket: { type: String, required: true },
  count: { type: Number, default: 0 },
  avgViews: { type: Number, default: 0 },
  avgEngagement: { type: Number, default: 0 },
  avgTimeOnPage: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
}, { _id: false });

const segmentPerformanceSchema = new mongoose.Schema<SegmentPerformance>({
  segment: { type: String, required: true },
  segmentType: { type: String, enum: ['geography', 'trafficSource', 'device'], required: true },
  value: { type: String, required: true },
  views: { type: Number, default: 0 },
  engagement: { type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
}, { _id: false });

const analysisPeriodSchema = new mongoose.Schema<IAnalysisPeriod>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    performanceByTopic: [topicPerformanceSchema],
    performanceByFormat: [formatPerformanceSchema],
    performanceByLength: [lengthPerformanceSchema],
    performanceBySegment: [segmentPerformanceSchema],
  },
  {
    timestamps: true,
    collection: 'analysisPeriods',
  }
);

analysisPeriodSchema.index({ startDate: 1, endDate: 1 });

export const AnalysisPeriodModel = mongoose.model<IAnalysisPeriod>('AnalysisPeriod', analysisPeriodSchema);
