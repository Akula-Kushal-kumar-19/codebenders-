import { ReportModel, ContentModel, AnalyticsModel } from '../models';
import logger from '../utils/logger';
import AnalyticsAggregationService from './AnalyticsAggregationService';
import PerformanceAnalysisService from './PerformanceAnalysisService';
import AIInsightsService from './AIInsightsService';
import { generateId } from '../utils/helpers';
import { mockReports } from '../utils/mockData';
import { IReport } from '@contentpulse/shared';
import { IReport } from '@contentpulse/shared';

export class ReportGenerationService {
  /**
   * Generate bi-weekly report
   */
  async generateBiWeeklyReport(): Promise<IReport> {
    try {
      logger.info('Generating bi-weekly report...');

      // Define period as last 14 days
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 14 * 24 * 60 * 60 * 1000);

      logger.info(`Report period: ${startDate} to ${endDate}`);

      // Analyze performance for the period
      await PerformanceAnalysisService.analyzePeriod(startDate, endDate);

      // Get top topics
      const topTopics = await PerformanceAnalysisService.getTopicPerformance(5);

      // Get best formats
      const bestFormats = await PerformanceAnalysisService.getFormatPerformance(5);

      // Get high-converting topics recommendations
      const recommendations = await AIInsightsService.identifyHighConvertingTopics();

      // Detect trends
      const trendInsights = await AIInsightsService.detectEmergingTrends();

      // Find content gaps
      const contentGaps = await AIInsightsService.findContentGaps();

      // Generate natural language insights
      const insights_text = await AIInsightsService.generateNaturalLanguageInsights({ startDate, endDate });

      // Get audience insights
      const audienceInsights = await this.getAudienceInsights();

      // Get traffic source analysis
      const trafficSourceAnalysis = await this.getTrafficSourceAnalysis();

      // Generate next actions
      const nextActions = this.generateNextActions(recommendations, contentGaps);

      // Create report object
      const report: IReport = {
        id: generateId(),
        generatedAt: new Date(),
        period: { startDate, endDate },
        recommendations: recommendations.slice(0, 10),
        insights: trendInsights.slice(0, 10),
        trends: [], // Trends would be calculated from the analysis
        topTopics: topTopics as any,
        bestFormats: bestFormats as any,
        contentGaps: contentGaps as any,
        audienceInsights,
        trafficSourceAnalysis,
        nextActions,
      };

      // Store report
      await ReportModel.create(report);
      logger.info(`Report generated: ${report.id}`);

      return report;
    } catch (error) {
      logger.error('Error generating report:', { error });
      throw error;
    }
  }

  /**
   * Get latest report
   */
  async getLatestReport(): Promise<IReport | null> {
    try {
      const report = await ReportModel.findOne().sort({ generatedAt: -1 });
      return report;
    } catch (error) {
      logger.error('Error fetching latest report:', { error });
      throw error;
    }
  }

  /**
   * Get report by ID
   */
  async getReportById(reportId: string): Promise<IReport | null> {
    try {
      const report = await ReportModel.findOne({ id: reportId });
      return report;
    } catch (error) {
      logger.error('Error fetching report:', { error });
      throw error;
    }
  }

  /**
   * Get all reports
   */
  async getAllReports(limit: number = 10, skip: number = 0) {
    try {
      const reports = await ReportModel.find()
        .sort({ generatedAt: -1 })
        .limit(limit)
        .skip(skip);
      
      const total = await ReportModel.countDocuments();

      return {
        reports,
        pagination: {
          total,
          limit,
          skip,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error fetching reports:', { error });
      throw error;
    }
  }

  /**
   * Get audience insights from analytics
   */
  private async getAudienceInsights() {
    try {
      const analytics = await AnalyticsModel.find().limit(100).lean();

      if (analytics.length === 0) {
        return [];
      }

      // Group by time on page patterns
      const shortTimeOnPage = analytics.filter(a => a.timeOnPage < 30).length;
      const mediumTimeOnPage = analytics.filter(a => a.timeOnPage >= 30 && a.timeOnPage < 300).length;
      const longTimeOnPage = analytics.filter(a => a.timeOnPage >= 300).length;

      const insights = [
        {
          type: 'behavior' as const,
          description: 'User engagement patterns',
          data: {
            shortTimeOnPage: `${((shortTimeOnPage / analytics.length) * 100).toFixed(1)}%`,
            mediumTimeOnPage: `${((mediumTimeOnPage / analytics.length) * 100).toFixed(1)}%`,
            longTimeOnPage: `${((longTimeOnPage / analytics.length) * 100).toFixed(1)}%`,
          },
        },
      ];

      return insights;
    } catch (error) {
      logger.warn('Error calculating audience insights:', { error });
      return [];
    }
  }

  /**
   * Get traffic source analysis
   */
  private async getTrafficSourceAnalysis() {
    try {
      // In a real implementation, this would analyze traffic sources from analytics data
      // For now, return mock data structure
      return [
        {
          source: 'Direct',
          traffic: 0,
          conversion: 0,
          avgSessionDuration: 0,
        },
        {
          source: 'Organic Search',
          traffic: 0,
          conversion: 0,
          avgSessionDuration: 0,
        },
        {
          source: 'Social Media',
          traffic: 0,
          conversion: 0,
          avgSessionDuration: 0,
        },
      ];
    } catch (error) {
      logger.warn('Error calculating traffic source analysis:', { error });
      return [];
    }
  }

  /**
   * Generate next actions based on insights
   */
  private generateNextActions(recommendations: any[], contentGaps: any[]): Array<{action: string; priority: 'high' | 'medium' | 'low'; dueDate: Date}> {
    const actions: Array<{action: string; priority: 'high' | 'medium' | 'low'; dueDate: Date}> = [];

    // Add action for top recommendation
    if (recommendations.length > 0) {
      const priority = recommendations[0].priority as 'high' | 'medium' | 'low';
      actions.push({
        action: recommendations[0].description,
        priority,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      });
    }

    // Add actions for content gaps
    contentGaps.slice(0, 2).forEach((gap: any) => {
      const priority = gap.priority as 'high' | 'medium' | 'low';
      actions.push({
        action: `Create new content on "${gap.topic}" - suggested: ${gap.suggestedContent?.title}`,
        priority,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
      });
    });

    return actions;
  }
}

export default new ReportGenerationService();
