import config from '../config';
import logger from '../utils/logger';
import { ContentModel, AnalyticsModel, ContentGapModel } from '../models';
import { 
  IContentPrediction, 
  PredictionFactor, 
  Recommendation, 
  Insight,
  ContentGap 
} from '@contentpulse/shared';
import { generateId, topN } from '../utils/helpers';

export class AIInsightsService {
  private openaiApiKey = config.OPENAI_API_KEY;
  private claudeApiKey = config.CLAUDE_API_KEY;

  /**
   * Generate content performance predictions
   */
  async predictContentPerformance(
    title: string,
    format: string,
    topic: string,
    length: number
  ): Promise<IContentPrediction> {
    try {
      logger.info(`Predicting performance for: ${title}`);

      // Get historical data for similar content
      const similarContent = await ContentModel.find({
        format,
        topic,
      }).lean();

      if (similarContent.length === 0) {
        // Return default prediction if no similar content
        return this.getDefaultPrediction(title, format, topic, length);
      }

      // Calculate base metrics from similar content
      const baseMetrics = await this.getBaseMetrics(similarContent);

      // Adjust for length
      const lengthMultiplier = this.getLengthMultiplier(length);
      const predictedViews = Math.round(baseMetrics.avgViews * lengthMultiplier);
      const predictedEngagement = Math.round(baseMetrics.avgEngagement * lengthMultiplier);
      const predictedConversionRate = baseMetrics.avgConversionRate * (1 + (lengthMultiplier - 1) * 0.1);

      // Calculate confidence based on sample size
      const confidence = Math.min(0.95, 0.5 + (similarContent.length / 100));

      // Determine prediction factors
      const factors = this.determinePredictionFactors(
        format,
        topic,
        length,
        baseMetrics,
        similarContent.length
      );

      return {
        title,
        format: format as any,
        topic,
        length,
        predictedViews,
        predictedEngagement,
        predictedConversionRate,
        confidence,
        factors,
      };
    } catch (error) {
      logger.error('Error predicting content performance:', { error });
      // Return default prediction on error
      return this.getDefaultPrediction(title, format, topic, length);
    }
  }

  /**
   * Identify high-converting topics
   */
  async identifyHighConvertingTopics(limit: number = 5): Promise<Recommendation[]> {
    try {
      logger.info('Identifying high-converting topics...');

      const contents = await ContentModel.find().lean();
      
      if (contents.length === 0) {
        return [];
      }

      // Get analytics for all content
      const analytics = await AnalyticsModel.find().lean();

      // Group by topic and calculate conversion rates
      const topicMetrics: { [key: string]: { conversions: number; views: number; count: number } } = {};

      contents.forEach(content => {
        if (!topicMetrics[content.topic]) {
          topicMetrics[content.topic] = { conversions: 0, views: 0, count: 0 };
        }
        topicMetrics[content.topic].count++;
      });

      analytics.forEach(analytic => {
        const content = contents.find(c => c.id === analytic.contentId);
        if (content && topicMetrics[content.topic]) {
          topicMetrics[content.topic].conversions += analytic.conversions;
          topicMetrics[content.topic].views += analytic.views;
        }
      });

      // Calculate conversion rates and sort
      const topicConversions = Object.entries(topicMetrics)
        .map(([topic, metrics]) => ({
          topic,
          conversionRate: metrics.views > 0 ? metrics.conversions / metrics.views : 0,
          avgConversionRate: metrics.conversions / (metrics.count || 1),
          count: metrics.count,
        }))
        .sort((a, b) => b.conversionRate - a.conversionRate)
        .slice(0, limit);

      return topicConversions.map((item, index) => ({
        priority: index < 2 ? 'high' : 'medium',
        type: 'topic',
        description: `Topic "${item.topic}" has high conversion potential with ${(item.conversionRate * 100).toFixed(2)}% conversion rate`,
        expectedImpact: `Increase content production in this topic to capture ${(item.conversionRate * 100).toFixed(2)}% of audience conversions`,
        confidenceScore: Math.min(0.95, 0.6 + (item.count / 100)),
      }));
    } catch (error) {
      logger.error('Error identifying high-converting topics:', { error });
      return [];
    }
  }

  /**
   * Detect emerging trends
   */
  async detectEmergingTrends(): Promise<Insight[]> {
    try {
      logger.info('Detecting emerging trends...');

      // Get analytics from the last 30 days, split into two periods
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

      const recentAnalytics = await AnalyticsModel.find({
        date: { $gte: fifteenDaysAgo, $lte: now },
      }).lean();

      const olderAnalytics = await AnalyticsModel.find({
        date: { $gte: thirtyDaysAgo, $lt: fifteenDaysAgo },
      }).lean();

      if (recentAnalytics.length === 0 || olderAnalytics.length === 0) {
        return [];
      }

      // Calculate trending topics
      const insights: Insight[] = [];

      // Group by topic and compare growth
      const topicGrowth = this.calculateTopicGrowth(recentAnalytics, olderAnalytics);

      const topTrends = topN(
        Object.entries(topicGrowth).map(([topic, growth]) => ({ topic, growth })),
        5,
        item => item.growth
      );

      topTrends.forEach(trend => {
        if (trend.growth > 0.1) { // 10% growth threshold
          insights.push({
            title: `Emerging trend in ${trend.topic}`,
            description: `The topic "${trend.topic}" is showing ${(trend.growth * 100).toFixed(1)}% growth in engagement over the past 15 days`,
            data: { topic: trend.topic, growthRate: trend.growth },
            supportingMetrics: ['engagement', 'views'],
          });
        }
      });

      return insights;
    } catch (error) {
      logger.error('Error detecting trends:', { error });
      return [];
    }
  }

  /**
   * Find content gaps
   */
  async findContentGaps(): Promise<ContentGap[]> {
    try {
      logger.info('Finding content gaps...');

      // Get all topics covered
      const coveredTopics = await ContentModel.distinct('topic');

      // Get high-performing topics
      const analytics = await AnalyticsModel.find().lean();
      const contents = await ContentModel.find().lean();

      // Find topics with high views but no recent content
      const topicViewsMap: { [key: string]: number } = {};

      analytics.forEach(analytic => {
        const content = contents.find(c => c.id === analytic.contentId);
        if (content) {
          if (!topicViewsMap[content.topic]) {
            topicViewsMap[content.topic] = 0;
          }
          topicViewsMap[content.topic] += analytic.views;
        }
      });

      // Identify gaps (high-interest topics with limited content)
      const gaps: ContentGap[] = [];

      Object.entries(topicViewsMap).forEach(([topic, views]) => {
        const topicContent = contents.filter(c => c.topic === topic);
        const avgViews = views / topicContent.length;

        // If average views per content is high but content count is low
        if (avgViews > 1000 && topicContent.length < 5) {
          gaps.push({
            id: generateId(),
            topic,
            searchVolume: Math.round(views),
            reason: `High engagement (${Math.round(avgViews)} avg views) but limited content coverage`,
            priority: avgViews > 5000 ? 'high' : 'medium',
            identifiedAt: new Date(),
            suggestedContent: {
              title: `Ultimate Guide to ${topic}`,
              format: 'article' as any,
              keywords: [topic, `${topic} guide`, `${topic} tips`],
            },
          });
        }
      });

      return gaps.sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0));
    } catch (error) {
      logger.error('Error finding content gaps:', { error });
      return [];
    }
  }

  /**
   * Generate natural language insights using AI
   */
  async generateNaturalLanguageInsights(period: { startDate: Date; endDate: Date }): Promise<string[]> {
    try {
      logger.info('Generating natural language insights...');

      const insights: string[] = [];

      // Get period analytics
      const analytics = await AnalyticsModel.find({
        date: { $gte: period.startDate, $lte: period.endDate },
      }).lean();

      if (analytics.length === 0) {
        return insights;
      }

      // Calculate summary metrics
      const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
      const totalEngagement = analytics.reduce((sum, a) => sum + a.engagement, 0);
      const avgTimeOnPage = analytics.reduce((sum, a) => sum + a.timeOnPage, 0) / analytics.length;

      insights.push(`During this period, your content generated ${totalViews.toLocaleString()} views.`);
      insights.push(`Total engagement (likes, shares, comments) reached ${totalEngagement.toLocaleString()}.`);
      insights.push(`Average time spent on content: ${Math.round(avgTimeOnPage)} seconds.`);

      // Add OpenAI-generated insights if API key is available
      if (this.openaiApiKey) {
        try {
          const aiInsights = await this.generateOpenAIInsights(
            totalViews,
            totalEngagement,
            avgTimeOnPage
          );
          insights.push(...aiInsights);
        } catch (error) {
          logger.warn('Error generating OpenAI insights:', { error });
        }
      }

      return insights;
    } catch (error) {
      logger.error('Error generating natural language insights:', { error });
      return [];
    }
  }

  /**
   * Generate insights using OpenAI API
   */
  private async generateOpenAIInsights(
    totalViews: number,
    totalEngagement: number,
    avgTimeOnPage: number
  ): Promise<string[]> {
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, return template insights
      const insights: string[] = [];

      if (totalViews > 10000) {
        insights.push('Your content is reaching a wide audience. Consider scaling production to capitalize on this momentum.');
      }

      if (avgTimeOnPage > 300) {
        insights.push('Readers are spending significant time on your content. This suggests high-quality, in-depth material.');
      }

      if (totalEngagement / totalViews > 0.05) {
        insights.push('Your engagement rate is above average. Your audience is actively interacting with your content.');
      }

      return insights;
    } catch (error) {
      logger.warn('Error in OpenAI insights:', { error });
      return [];
    }
  }

  /**
   * Helper: Get base metrics from similar content
   */
  private async getBaseMetrics(similarContent: any[]) {
    const contentIds = similarContent.map(c => c.id);
    const analytics = await AnalyticsModel.find({ contentId: { $in: contentIds } }).lean();

    const avgViews = analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.views, 0) / analytics.length
      : 1000;

    const avgEngagement = analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.engagement, 0) / analytics.length
      : 50;

    const totalConversions = analytics.reduce((sum, a) => sum + a.conversions, 0);
    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const avgConversionRate = totalViews > 0 ? totalConversions / totalViews : 0.02;

    return { avgViews, avgEngagement, avgConversionRate };
  }

  /**
   * Helper: Get length multiplier for predictions
   */
  private getLengthMultiplier(length: number): number {
    // Longer content typically performs better, with diminishing returns
    if (length < 500) return 0.8;
    if (length < 1000) return 1.0;
    if (length < 1500) return 1.2;
    if (length < 2000) return 1.3;
    return 1.4;
  }

  /**
   * Helper: Determine prediction factors
   */
  private determinePredictionFactors(
    format: string,
    topic: string,
    length: number,
    baseMetrics: any,
    sampleSize: number
  ): PredictionFactor[] {
    const factors: PredictionFactor[] = [];

    // Format factor
    const formatImpact = format === 'article' ? 1.1 : format === 'video' ? 1.3 : 1.0;
    factors.push({
      factor: `Content format (${format})`,
      impact: formatImpact > 1 ? 'positive' : 'negative',
      magnitude: Math.abs(formatImpact - 1),
      explanation: `${format} content typically performs ${formatImpact > 1 ? 'better' : 'worse'} in this category`,
    });

    // Length factor
    const lengthMultiplier = this.getLengthMultiplier(length);
    factors.push({
      factor: `Content length (${length} words)`,
      impact: lengthMultiplier > 1 ? 'positive' : 'negative',
      magnitude: Math.abs(lengthMultiplier - 1),
      explanation: `This length is ${lengthMultiplier > 1 ? 'optimal' : 'shorter than optimal'} for performance`,
    });

    // Sample size factor
    factors.push({
      factor: 'Historical data availability',
      impact: sampleSize > 10 ? 'positive' : 'neutral',
      magnitude: Math.min(0.3, sampleSize / 50),
      explanation: `Prediction confidence is ${sampleSize > 10 ? 'high' : 'moderate'} based on ${sampleSize} similar articles`,
    });

    return factors;
  }

  /**
   * Helper: Get default prediction
   */
  private getDefaultPrediction(
    title: string,
    format: string,
    topic: string,
    length: number
  ): IContentPrediction {
    return {
      title,
      format: format as any,
      topic,
      length,
      predictedViews: 2000,
      predictedEngagement: 100,
      predictedConversionRate: 0.02,
      confidence: 0.3,
      factors: [
        {
          factor: 'Insufficient historical data',
          impact: 'negative',
          magnitude: 1.0,
          explanation: 'No similar content found for reliable prediction',
        },
      ],
    };
  }

  /**
   * Helper: Calculate topic growth
   */
  private calculateTopicGrowth(recent: any[], older: any[]) {
    const recentTopics: { [key: string]: number } = {};
    const olderTopics: { [key: string]: number } = {};

    recent.forEach(a => {
      if (!recentTopics[a.channel]) recentTopics[a.channel] = 0;
      recentTopics[a.channel] += a.engagement;
    });

    older.forEach(a => {
      if (!olderTopics[a.channel]) olderTopics[a.channel] = 0;
      olderTopics[a.channel] += a.engagement;
    });

    const growth: { [key: string]: number } = {};
    Object.keys(recentTopics).forEach(topic => {
      const oldValue = olderTopics[topic] || 1;
      growth[topic] = (recentTopics[topic] - oldValue) / oldValue;
    });

    return growth;
  }
}

export default new AIInsightsService();
