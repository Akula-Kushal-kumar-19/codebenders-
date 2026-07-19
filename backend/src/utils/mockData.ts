// Mock data service - used when MongoDB is not available
export const mockContentData = [
  {
    id: 'content-1',
    title: 'Getting Started with React Hooks',
    url: 'https://example.com/react-hooks',
    format: 'article',
    topic: 'React',
    subtopics: ['Hooks', 'React 18'],
    length: 3500,
    publishedAt: new Date('2024-01-15'),
    channels: ['blog', 'linkedin'],
    author: 'John Doe',
  },
  {
    id: 'content-2',
    title: 'Node.js Best Practices 2024',
    url: 'https://example.com/nodejs-practices',
    format: 'article',
    topic: 'Node.js',
    subtopics: ['Backend', 'Performance'],
    length: 4200,
    publishedAt: new Date('2024-01-18'),
    channels: ['blog', 'twitter'],
    author: 'Jane Smith',
  },
  {
    id: 'content-3',
    title: 'TypeScript Tutorial for Beginners',
    url: 'https://example.com/typescript-tutorial',
    format: 'video',
    topic: 'TypeScript',
    subtopics: ['Web Development', 'Types'],
    length: 8000,
    publishedAt: new Date('2024-01-20'),
    channels: ['youtube', 'linkedin'],
    author: 'Mike Johnson',
  },
  {
    id: 'content-4',
    title: 'Web Performance Optimization',
    url: 'https://example.com/web-performance',
    format: 'article',
    topic: 'Web Performance',
    subtopics: ['Frontend', 'Optimization'],
    length: 5100,
    publishedAt: new Date('2024-01-22'),
    channels: ['blog', 'twitter', 'linkedin'],
    author: 'Sarah Davis',
  },
  {
    id: 'content-5',
    title: 'GraphQL vs REST APIs',
    url: 'https://example.com/graphql-vs-rest',
    format: 'article',
    topic: 'GraphQL',
    subtopics: ['APIs', 'Backend'],
    length: 3800,
    publishedAt: new Date('2024-01-25'),
    channels: ['blog', 'linkedin'],
    author: 'Tom Wilson',
  },
  {
    id: 'content-6',
    title: 'JavaScript Async/Await Explained',
    url: 'https://example.com/async-await',
    format: 'video',
    topic: 'JavaScript',
    subtopics: ['Async', 'Promises'],
    length: 6500,
    publishedAt: new Date('2024-01-28'),
    channels: ['youtube', 'linkedin'],
    author: 'Emily Brown',
  },
  {
    id: 'content-7',
    title: 'CSS Grid Layout Deep Dive',
    url: 'https://example.com/css-grid',
    format: 'article',
    topic: 'CSS',
    subtopics: ['Frontend', 'Layout'],
    length: 4000,
    publishedAt: new Date('2024-02-01'),
    channels: ['blog', 'twitter'],
    author: 'Chris Martin',
  },
  {
    id: 'content-8',
    title: 'Docker Containerization Guide',
    url: 'https://example.com/docker-guide',
    format: 'article',
    topic: 'DevOps',
    subtopics: ['Docker', 'Containers'],
    length: 5500,
    publishedAt: new Date('2024-02-03'),
    channels: ['blog', 'linkedin'],
    author: 'David Lee',
  },
];

export const mockAnalyticsData = [
  // React content (content-1) - 5 records
  { id: 'a-1', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-01'), views: 2350, engagement: 290, timeOnPage: 245, conversions: 95, clickThroughRate: 0.15 },
  { id: 'a-2', contentId: 'content-1', channel: 'linkedin', date: new Date('2024-02-02'), views: 1800, engagement: 220, timeOnPage: 200, conversions: 72, clickThroughRate: 0.12 },
  { id: 'a-3', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-03'), views: 2100, engagement: 260, timeOnPage: 230, conversions: 84, clickThroughRate: 0.14 },
  { id: 'a-4', contentId: 'content-1', channel: 'linkedin', date: new Date('2024-02-04'), views: 1950, engagement: 240, timeOnPage: 210, conversions: 78, clickThroughRate: 0.13 },
  { id: 'a-5', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-05'), views: 2200, engagement: 270, timeOnPage: 240, conversions: 88, clickThroughRate: 0.145 },
  
  // Node.js content (content-2)
  { id: 'a-6', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-01'), views: 2280, engagement: 310, timeOnPage: 260, conversions: 91, clickThroughRate: 0.16 },
  { id: 'a-7', contentId: 'content-2', channel: 'twitter', date: new Date('2024-02-02'), views: 1650, engagement: 200, timeOnPage: 180, conversions: 66, clickThroughRate: 0.11 },
  { id: 'a-8', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-03'), views: 2400, engagement: 330, timeOnPage: 275, conversions: 96, clickThroughRate: 0.17 },
  { id: 'a-9', contentId: 'content-2', channel: 'twitter', date: new Date('2024-02-04'), views: 1500, engagement: 180, timeOnPage: 160, conversions: 60, clickThroughRate: 0.10 },
  { id: 'a-10', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-05'), views: 2350, engagement: 300, timeOnPage: 255, conversions: 94, clickThroughRate: 0.155 },
  
  // TypeScript content (content-3) - video
  { id: 'a-11', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-01'), views: 3100, engagement: 450, timeOnPage: 520, conversions: 155, clickThroughRate: 0.22 },
  { id: 'a-12', contentId: 'content-3', channel: 'linkedin', date: new Date('2024-02-02'), views: 2050, engagement: 280, timeOnPage: 350, conversions: 102, clickThroughRate: 0.15 },
  { id: 'a-13', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-03'), views: 3250, engagement: 480, timeOnPage: 560, conversions: 162, clickThroughRate: 0.23 },
  { id: 'a-14', contentId: 'content-3', channel: 'linkedin', date: new Date('2024-02-04'), views: 1950, engagement: 260, timeOnPage: 330, conversions: 97, clickThroughRate: 0.14 },
  { id: 'a-15', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-05'), views: 3000, engagement: 420, timeOnPage: 500, conversions: 150, clickThroughRate: 0.21 },
  
  // Web Performance content (content-4)
  { id: 'a-16', contentId: 'content-4', channel: 'blog', date: new Date('2024-02-01'), views: 1850, engagement: 220, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125 },
  { id: 'a-17', contentId: 'content-4', channel: 'twitter', date: new Date('2024-02-02'), views: 1400, engagement: 160, timeOnPage: 150, conversions: 56, clickThroughRate: 0.095 },
  { id: 'a-18', contentId: 'content-4', channel: 'linkedin', date: new Date('2024-02-03'), views: 1600, engagement: 190, timeOnPage: 180, conversions: 64, clickThroughRate: 0.11 },
  { id: 'a-19', contentId: 'content-4', channel: 'blog', date: new Date('2024-02-04'), views: 2000, engagement: 240, timeOnPage: 230, conversions: 80, clickThroughRate: 0.135 },
  { id: 'a-20', contentId: 'content-4', channel: 'twitter', date: new Date('2024-02-05'), views: 1550, engagement: 180, timeOnPage: 170, conversions: 62, clickThroughRate: 0.105 },
  
  // GraphQL content (content-5)
  { id: 'a-21', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-01'), views: 1950, engagement: 250, timeOnPage: 215, conversions: 78, clickThroughRate: 0.13 },
  { id: 'a-22', contentId: 'content-5', channel: 'linkedin', date: new Date('2024-02-02'), views: 1750, engagement: 210, timeOnPage: 195, conversions: 70, clickThroughRate: 0.12 },
  { id: 'a-23', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-03'), views: 2050, engagement: 270, timeOnPage: 230, conversions: 82, clickThroughRate: 0.14 },
  { id: 'a-24', contentId: 'content-5', channel: 'linkedin', date: new Date('2024-02-04'), views: 1650, engagement: 200, timeOnPage: 185, conversions: 66, clickThroughRate: 0.11 },
  { id: 'a-25', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-05'), views: 1900, engagement: 240, timeOnPage: 210, conversions: 76, clickThroughRate: 0.125 },
  
  // JavaScript content (content-6) - video
  { id: 'a-26', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-01'), views: 2850, engagement: 380, timeOnPage: 450, conversions: 142, clickThroughRate: 0.20 },
  { id: 'a-27', contentId: 'content-6', channel: 'linkedin', date: new Date('2024-02-02'), views: 1900, engagement: 240, timeOnPage: 300, conversions: 95, clickThroughRate: 0.14 },
  { id: 'a-28', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-03'), views: 2950, engagement: 400, timeOnPage: 480, conversions: 147, clickThroughRate: 0.21 },
  { id: 'a-29', contentId: 'content-6', channel: 'linkedin', date: new Date('2024-02-04'), views: 2000, engagement: 260, timeOnPage: 320, conversions: 100, clickThroughRate: 0.15 },
  { id: 'a-30', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-05'), views: 2750, engagement: 360, timeOnPage: 430, conversions: 137, clickThroughRate: 0.195 },
  
  // CSS content (content-7)
  { id: 'a-31', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-01'), views: 1700, engagement: 200, timeOnPage: 190, conversions: 68, clickThroughRate: 0.115 },
  { id: 'a-32', contentId: 'content-7', channel: 'twitter', date: new Date('2024-02-02'), views: 1300, engagement: 150, timeOnPage: 140, conversions: 52, clickThroughRate: 0.09 },
  { id: 'a-33', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-03'), views: 1850, engagement: 220, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125 },
  { id: 'a-34', contentId: 'content-7', channel: 'twitter', date: new Date('2024-02-04'), views: 1450, engagement: 170, timeOnPage: 160, conversions: 58, clickThroughRate: 0.10 },
  { id: 'a-35', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-05'), views: 1750, engagement: 210, timeOnPage: 195, conversions: 70, clickThroughRate: 0.12 },
  
  // DevOps content (content-8)
  { id: 'a-36', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-01'), views: 2150, engagement: 280, timeOnPage: 240, conversions: 86, clickThroughRate: 0.14 },
  { id: 'a-37', contentId: 'content-8', channel: 'linkedin', date: new Date('2024-02-02'), views: 1850, engagement: 230, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125 },
  { id: 'a-38', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-03'), views: 2300, engagement: 310, timeOnPage: 260, conversions: 92, clickThroughRate: 0.15 },
  { id: 'a-39', contentId: 'content-8', channel: 'linkedin', date: new Date('2024-02-04'), views: 2000, engagement: 260, timeOnPage: 230, conversions: 80, clickThroughRate: 0.135 },
  { id: 'a-40', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-05'), views: 2200, engagement: 290, timeOnPage: 250, conversions: 88, clickThroughRate: 0.145 },
];

export const getTopicPerformance = () => {
  const topicMetrics: {[key: string]: { views: number; engagement: number; conversions: number; count: number }} = {};

  // Group analytics by topic
  mockAnalyticsData.forEach(analytic => {
    const content = mockContentData.find(c => c.id === analytic.contentId);
    if (content) {
      if (!topicMetrics[content.topic]) {
        topicMetrics[content.topic] = { views: 0, engagement: 0, conversions: 0, count: 0 };
      }
      topicMetrics[content.topic].views += analytic.views;
      topicMetrics[content.topic].engagement += analytic.engagement;
      topicMetrics[content.topic].conversions += analytic.conversions;
      topicMetrics[content.topic].count += 1;
    }
  });

  return Object.entries(topicMetrics)
    .map(([topic, metrics]) => ({
      topic,
      avgViews: Math.round(metrics.views / metrics.count),
      avgEngagement: Math.round(metrics.engagement / metrics.count),
      conversionRate: Math.round((metrics.conversions / metrics.views) * 10000) / 100,
      count: mockContentData.filter(c => c.topic === topic).length,
    }))
    .sort((a, b) => b.avgViews - a.avgViews);
};

export const getFormatPerformance = () => {
  const formatMetrics: {[key: string]: { views: number; engagement: number; conversions: number; count: number }} = {};

  mockAnalyticsData.forEach(analytic => {
    const content = mockContentData.find(c => c.id === analytic.contentId);
    if (content) {
      if (!formatMetrics[content.format]) {
        formatMetrics[content.format] = { views: 0, engagement: 0, conversions: 0, count: 0 };
      }
      formatMetrics[content.format].views += analytic.views;
      formatMetrics[content.format].engagement += analytic.engagement;
      formatMetrics[content.format].conversions += analytic.conversions;
      formatMetrics[content.format].count += 1;
    }
  });

  return Object.entries(formatMetrics)
    .map(([format, metrics]) => ({
      format,
      avgViews: Math.round(metrics.views / metrics.count),
      avgEngagement: Math.round(metrics.engagement / metrics.count),
      conversionRate: Math.round((metrics.conversions / metrics.views) * 10000) / 100,
      count: mockContentData.filter(c => c.format === format).length,
    }))
    .sort((a, b) => b.avgViews - a.avgViews);
};

export const getAnalyticsSummary = () => {
  const totalViews = mockAnalyticsData.reduce((sum, a) => sum + a.views, 0);
  const totalEngagement = mockAnalyticsData.reduce((sum, a) => sum + a.engagement, 0);
  const avgTimeOnPage = Math.round(mockAnalyticsData.reduce((sum, a) => sum + a.timeOnPage, 0) / mockAnalyticsData.length);

  return {
    totalContent: mockContentData.length,
    totalViews,
    totalEngagement,
    avgTimeOnPage,
    avgConversionRate: Math.round((mockAnalyticsData.reduce((sum, a) => sum + a.conversions, 0) / totalViews) * 10000) / 100,
  };
};
