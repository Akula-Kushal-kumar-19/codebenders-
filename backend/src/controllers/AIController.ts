import { Request, Response } from 'express';
import AIInsightsService from '../services/AIInsightsService';
import { RequestValidator } from '../utils';
import logger from '../utils/logger';

export class AIController {
  /**
   * Get predictions for content
   */
  async getPredictions(req: Request, res: Response) {
    try {
      const { title, format, topic, length } = req.body;

      const validatedTitle = RequestValidator.requireString(title, 'title');
      const validatedFormat = RequestValidator.requireEnum(format, 'format', [
        'article', 'video', 'newsletter', 'social', 'podcast', 'infographic'
      ]);
      const validatedTopic = RequestValidator.requireString(topic, 'topic');
      const validatedLength = RequestValidator.optionalNumber(length, 'length', 0);

      const prediction = await AIInsightsService.predictContentPerformance(
        validatedTitle,
        validatedFormat,
        validatedTopic,
        validatedLength || 0
      );

      res.json({ success: true, data: prediction });
    } catch (error) {
      logger.error('Error generating predictions:', { error });
      res.status(error instanceof Error && error.message.includes('VALIDATION') ? 400 : 500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  /**
   * Get insights
   */
  async getInsights(req: Request, res: Response) {
    try {
      const insights = {
        highConvertingTopics: await AIInsightsService.identifyHighConvertingTopics(5),
        emergingTrends: await AIInsightsService.detectEmergingTrends(),
        contentGaps: await AIInsightsService.findContentGaps(),
      };

      res.json({ success: true, data: insights });
    } catch (error) {
      logger.error('Error fetching insights:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get content gaps
   */
  async getContentGaps(req: Request, res: Response) {
    try {
      const gaps = await AIInsightsService.findContentGaps();

      res.json({ success: true, data: gaps });
    } catch (error) {
      logger.error('Error fetching content gaps:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get high-converting topics
   */
  async getHighConvertingTopics(req: Request, res: Response) {
    try {
      const { limit = 5 } = req.query;
      const topics = await AIInsightsService.identifyHighConvertingTopics(Number(limit));

      res.json({ success: true, data: topics });
    } catch (error) {
      logger.error('Error fetching high-converting topics:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get emerging trends
   */
  async getEmergingTrends(req: Request, res: Response) {
    try {
      const trends = await AIInsightsService.detectEmergingTrends();

      res.json({ success: true, data: trends });
    } catch (error) {
      logger.error('Error fetching trends:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export default new AIController();
