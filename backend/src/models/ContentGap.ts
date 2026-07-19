import mongoose from 'mongoose';
import { IContentGap } from '@contentpulse/shared';

const contentGapSchema = new mongoose.Schema<IContentGap>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      index: true,
    },
    format: String,
    searchVolume: {
      type: Number,
      default: 0,
    },
    competition: {
      type: Number,
      default: 0,
    },
    opportunity: {
      type: Number,
      default: 0,
    },
    reason: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    identifiedAt: {
      type: Date,
      default: () => new Date(),
    },
    suggestedContent: {
      title: String,
      format: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    collection: 'contentGaps',
  }
);

contentGapSchema.index({ priority: 1, searchVolume: -1 });
contentGapSchema.index({ topic: 1, format: 1 });

export const ContentGapModel = mongoose.model<IContentGap>('ContentGap', contentGapSchema);
