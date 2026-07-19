import { Request, Response } from 'express';
import { ContentModel, AnalyticsModel } from '../models';
import { generateId, RequestValidator } from '../utils';
import logger from '../utils/logger';

export class ContentController {
  /**
   * Create new content
   */
  async create(req: Request, res: Response) {
    try {
      const { title, url, format, topic, subtopics, length, publishedAt, channels, author, description } = req.body;

      // Validate required fields
      const validatedTitle = RequestValidator.requireString(title, 'title', 1, 500);
      const validatedUrl = RequestValidator.requireString(url, 'url');
      const validatedFormat = RequestValidator.requireEnum(format, 'format', [
        'article', 'video', 'newsletter', 'social', 'podcast', 'infographic'
      ]);
      const validatedTopic = RequestValidator.requireString(topic, 'topic');
      const validatedLength = RequestValidator.optionalNumber(length, 'length', 0);
      const validatedPublishedAt = RequestValidator.requireDate(publishedAt, 'publishedAt');

      const content = {
        id: generateId(),
        title: validatedTitle,
        url: validatedUrl,
        format: validatedFormat,
        topic: validatedTopic,
        subtopics: subtopics || [],
        length: validatedLength || 0,
        publishedAt: validatedPublishedAt,
        channels: channels || [],
        author: author || undefined,
        description: description || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await ContentModel.create(content);
      logger.info(`Content created: ${content.id}`);

      res.status(201).json({ success: true, data: content });
    } catch (error) {
      logger.error('Error creating content:', { error });
      res.status(error instanceof Error && error.message.includes('VALIDATION') ? 400 : 500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  /**
   * Get content by ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const content = await ContentModel.findOne({ id });

      if (!content) {
        return res.status(404).json({ success: false, error: 'Content not found' });
      }

      res.json({ success: true, data: content });
    } catch (error) {
      logger.error('Error fetching content:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get content performance
   */
  async getPerformance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;

      const content = await ContentModel.findOne({ id });
      if (!content) {
        return res.status(404).json({ success: false, error: 'Content not found' });
      }

      const query: any = { contentId: id };
      
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate as string);
        if (endDate) query.date.$lte = new Date(endDate as string);
      }

      const analytics = await AnalyticsModel.find(query).sort({ date: -1 });

      // Calculate summary
      let summary = {
        totalViews: 0,
        totalEngagement: 0,
        avgTimeOnPage: 0,
        conversionRate: 0,
      };

      if (analytics.length > 0) {
        summary = {
          totalViews: analytics.reduce((sum, a) => sum + a.views, 0),
          totalEngagement: analytics.reduce((sum, a) => sum + a.engagement, 0),
          avgTimeOnPage: analytics.reduce((sum, a) => sum + a.timeOnPage, 0) / analytics.length,
          conversionRate: analytics.length > 0
            ? analytics.reduce((sum, a) => sum + a.conversions, 0) / analytics.reduce((sum, a) => sum + a.views, 0)
            : 0,
        };
      }

      res.json({
        success: true,
        data: {
          content,
          analytics,
          summary,
        },
      });
    } catch (error) {
      logger.error('Error fetching content performance:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * List content
   */
  async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 20, topic, format } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const query: any = {};

      if (topic) query.topic = topic;
      if (format) query.format = format;

      const contents = await ContentModel.find(query)
        .sort({ publishedAt: -1 })
        .limit(Number(limit))
        .skip(skip);

      const total = await ContentModel.countDocuments(query);

      res.json({
        success: true,
        data: contents,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      logger.error('Error listing content:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Update content
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, topic, subtopics, channels } = req.body;

      const updateData: any = {
        updatedAt: new Date(),
      };

      if (title !== undefined) updateData.title = title;
      if (topic !== undefined) updateData.topic = topic;
      if (subtopics !== undefined) updateData.subtopics = subtopics;
      if (channels !== undefined) updateData.channels = channels;

      const content = await ContentModel.findOneAndUpdate(
        { id },
        updateData,
        { new: true }
      );

      if (!content) {
        return res.status(404).json({ success: false, error: 'Content not found' });
      }

      logger.info(`Content updated: ${id}`);
      res.json({ success: true, data: content });
    } catch (error) {
      logger.error('Error updating content:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Delete content
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await ContentModel.deleteOne({ id });
      await AnalyticsModel.deleteMany({ contentId: id });

      logger.info(`Content deleted: ${id}`);
      res.json({ success: true, message: 'Content deleted' });
    } catch (error) {
      logger.error('Error deleting content:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export default new ContentController();
