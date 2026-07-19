import mongoose from 'mongoose';
import { IContent, ContentFormat } from '@contentpulse/shared';

const contentSchema = new mongoose.Schema<IContent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    format: {
      type: String,
      enum: ['article', 'video', 'newsletter', 'social', 'podcast', 'infographic'],
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      index: true,
    },
    subtopics: {
      type: [String],
      default: [],
    },
    length: {
      type: Number,
      default: 0, // in words
    },
    publishedAt: {
      type: Date,
      required: true,
      index: true,
    },
    channels: {
      type: [String],
      default: [],
      index: true,
    },
    author: String,
    description: String,
  },
  {
    timestamps: true,
    collection: 'contents',
  }
);

// Indexes for common queries
contentSchema.index({ topic: 1, format: 1 });
contentSchema.index({ publishedAt: -1 });
contentSchema.index({ channels: 1 });

export const ContentModel = mongoose.model<IContent>('Content', contentSchema);
