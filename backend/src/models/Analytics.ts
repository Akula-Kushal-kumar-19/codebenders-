import mongoose from 'mongoose';
import { IAnalytics } from '@contentpulse/shared';

const analyticsSchema = new mongoose.Schema<IAnalytics>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    contentId: {
      type: String,
      required: true,
      index: true,
    },
    channel: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    engagement: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeOnPage: {
      type: Number,
      default: 0,
      min: 0,
    },
    conversions: {
      type: Number,
      default: 0,
      min: 0,
    },
    clickThroughRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    searchRankings: [Number],
    bounceRate: {
      type: Number,
      min: 0,
      max: 1,
    },
    socialShares: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: 'analytics',
  }
);

// Indexes for common queries
analyticsSchema.index({ contentId: 1, date: -1 });
analyticsSchema.index({ channel: 1, date: -1 });
analyticsSchema.index({ date: -1 });

export const AnalyticsModel = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
