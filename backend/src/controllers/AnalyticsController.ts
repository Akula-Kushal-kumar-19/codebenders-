import { Request, Response } from 'express';
import AnalyticsAggregationService from '../services/AnalyticsAggregationService';
import PerformanceAnalysisService from '../services/PerformanceAnalysisService';
import { AnalyticsModel, ContentModel } from '../models';
import logger from '../utils/logger';
import { generateId, RequestValidator } from '../utils';

export class AnalyticsController {
  /**
   * Record analytics data
   */
  async recordAnalytics(req: Request, res: Response) {
    try {
      const { contentId, channel, date, views, engagement, timeOnPage, conversions, clickThroughRate } = req.body;

      const validatedContentId = RequestValidator.requireString(contentId, 'contentId');
      const validatedChannel = RequestValidator.requireString(channel, 'channel');
      const validatedDate = RequestValidator.requireDate(date, 'date');
      const validatedViews = RequestValidator.requireNumber(views, 'views', 0);
      const validatedEngagement = RequestValidator.optionalNumber(engagement, 'engagement', 0);
      const validatedTimeOnPage = RequestValidator.optionalNumber(timeOnPage, 'timeOnPage', 0);
      const validatedConversions = RequestValidator.optionalNumber(conversions, 'conversions', 0);
      const validatedCTR = RequestValidator.optionalNumber(clickThroughRate, 'clickThroughRate', 0, 1);

      const analytics = {
        id: generateId(),
        contentId: validatedContentId,
        channel: validatedChannel,
        date: validatedDate,
        views: validatedViews,
        engagement: validatedEngagement || 0,
        timeOnPage: validatedTimeOnPage || 0,
        conversions: validatedConversions || 0,
        clickThroughRate: validatedCTR || 0,
        createdAt: new Date(),
      };

      await AnalyticsModel.create(analytics);
      logger.info(`Analytics recorded: ${analytics.id}`);

      res.status(201).json({ success: true, data: analytics });
    } catch (error) {
      logger.error('Error recording analytics:', { error });
      res.status(error instanceof Error && error.message.includes('VALIDATION') ? 400 : 500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  /**
   * Get analytics summary
   */
  async getSummary(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const query: any = {};
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate as string);
        if (endDate) query.date.$lte = new Date(endDate as string);
      }

      const analytics = await AnalyticsModel.find(query);
      const contents = await ContentModel.find();

      if (analytics.length === 0) {
        return res.json({
          success: true,
          data: {
            period: { startDate: startDate || 'N/A', endDate: endDate || 'N/A' },
            totalContent: contents.length,
            totalViews: 0,
            totalEngagement: 0,
            avgTimeOnPage: 0,
            avgConversionRate: 0,
            topTopics: [],
            topFormats: [],
          },
        });
      }

      const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
      const totalEngagement = analytics.reduce((sum, a) => sum + a.engagement, 0);
      const avgTimeOnPage = analytics.reduce((sum, a) => sum + a.timeOnPage, 0) / analytics.length;
      const conversionRate = analytics.reduce((sum, a) => sum + a.conversions, 0) / totalViews;

      const topTopics = await PerformanceAnalysisService.getTopicPerformance(5);
      const topFormats = await PerformanceAnalysisService.getFormatPerformance(5);

      res.json({
        success: true,
        data: {
          period: { startDate: startDate || 'N/A', endDate: endDate || 'N/A' },
          totalContent: contents.length,
          totalViews,
          totalEngagement,
          avgTimeOnPage,
          avgConversionRate: conversionRate,
          topTopics,
          topFormats,
        },
      });
    } catch (error) {
      logger.error('Error fetching analytics summary:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Sync all channels
   */
  async syncChannels(req: Request, res: Response) {
    try {
      logger.info('Initiating manual channel sync...');
      
      // Run async without waiting
      AnalyticsAggregationService.syncAllChannels().catch(error => {
        logger.error('Error in background sync:', { error });
      });

      res.json({ success: true, message: 'Analytics sync initiated' });
    } catch (error) {
      logger.error('Error initiating sync:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get topic performance
   */
  async getTopicPerformance(req: Request, res: Response) {
    try {
      const { limit = 10 } = req.query;
      const performance = await PerformanceAnalysisService.getTopicPerformance(Number(limit));

      res.json({ success: true, data: performance });
    } catch (error) {
      logger.error('Error fetching topic performance:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get format performance
   */
  async getFormatPerformance(req: Request, res: Response) {
    try {
      const { limit = 10 } = req.query;
      const performance = await PerformanceAnalysisService.getFormatPerformance(Number(limit));

      res.json({ success: true, data: performance });
    } catch (error) {
      logger.error('Error fetching format performance:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export default new AnalyticsController();
