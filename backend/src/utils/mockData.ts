// Mock data service - used throughout the application
// All data is prefixed with "Sample" or "Demo" to identify as mock data


export const mockContentData = [
  {
    id: 'content-1',
    title: 'Sample: Getting Started with React Hooks',
    url: 'https://example.com/react-hooks',
    format: 'article',
    topic: 'React',
    subtopics: ['Hooks', 'React 18'],
    length: 3500,
    publishedAt: new Date('2024-01-15'),
    channels: ['blog', 'linkedin'],
    author: 'Demo User: John Doe',
    description: 'Comprehensive guide to using React Hooks for state management and side effects',
    status: 'published',
  },
  {
    id: 'content-2',
    title: 'Sample: Node.js Best Practices 2024',
    url: 'https://example.com/nodejs-practices',
    format: 'article',
    topic: 'Node.js',
    subtopics: ['Backend', 'Performance'],
    length: 4200,
    publishedAt: new Date('2024-01-18'),
    channels: ['blog', 'twitter'],
    author: 'Demo User: Jane Smith',
    description: 'Essential Node.js best practices for production applications',
    status: 'published',
  },
  {
    id: 'content-3',
    title: 'Sample: TypeScript Tutorial for Beginners',
    url: 'https://example.com/typescript-tutorial',
    format: 'video',
    topic: 'TypeScript',
    subtopics: ['Web Development', 'Types'],
    length: 8000,
    publishedAt: new Date('2024-01-20'),
    channels: ['youtube', 'linkedin'],
    author: 'Demo User: Mike Johnson',
    description: 'Learn TypeScript from scratch with practical examples and exercises',
    status: 'published',
  },
  {
    id: 'content-4',
    title: 'Sample: Web Performance Optimization Guide',
    url: 'https://example.com/web-performance',
    format: 'article',
    topic: 'Web Performance',
    subtopics: ['Frontend', 'Optimization'],
    length: 5100,
    publishedAt: new Date('2024-01-22'),
    channels: ['blog', 'twitter', 'linkedin'],
    author: 'Demo User: Sarah Davis',
    description: 'Master techniques to optimize web application performance and user experience',
    status: 'published',
  },
  {
    id: 'content-5',
    title: 'Sample: GraphQL vs REST APIs Comparison',
    url: 'https://example.com/graphql-vs-rest',
    format: 'article',
    topic: 'GraphQL',
    subtopics: ['APIs', 'Backend'],
    length: 3800,
    publishedAt: new Date('2024-01-25'),
    channels: ['blog', 'linkedin'],
    author: 'Demo User: Tom Wilson',
    description: 'Deep dive comparison of GraphQL and REST API architectures',
    status: 'published',
  },
  {
    id: 'content-6',
    title: 'Sample: JavaScript Async/Await Explained',
    url: 'https://example.com/async-await',
    format: 'video',
    topic: 'JavaScript',
    subtopics: ['Async', 'Promises'],
    length: 6500,
    publishedAt: new Date('2024-01-28'),
    channels: ['youtube', 'linkedin'],
    author: 'Demo User: Emily Brown',
    description: 'Master asynchronous JavaScript with async/await patterns and examples',
    status: 'published',
  },
  {
    id: 'content-7',
    title: 'Sample: CSS Grid Layout Deep Dive',
    url: 'https://example.com/css-grid',
    format: 'article',
    topic: 'CSS',
    subtopics: ['Frontend', 'Layout'],
    length: 4000,
    publishedAt: new Date('2024-02-01'),
    channels: ['blog', 'twitter'],
    author: 'Demo User: Chris Martin',
    description: 'Complete CSS Grid guide for building complex, responsive layouts',
    status: 'published',
  },
  {
    id: 'content-8',
    title: 'Sample: Docker Containerization Guide',
    url: 'https://example.com/docker-guide',
    format: 'article',
    topic: 'DevOps',
    subtopics: ['Docker', 'Containers'],
    length: 5500,
    publishedAt: new Date('2024-02-03'),
    channels: ['blog', 'linkedin'],
    author: 'Demo User: David Lee',
    description: 'Learn Docker containerization for deploying applications at scale',
    status: 'published',
  },
  {
    id: 'content-9',
    title: 'Sample: Machine Learning Basics',
    url: 'https://example.com/ml-basics',
    format: 'video',
    topic: 'AI/ML',
    subtopics: ['Machine Learning', 'Python'],
    length: 7200,
    publishedAt: new Date('2024-02-05'),
    channels: ['youtube', 'linkedin'],
    author: 'Demo User: Lisa Anderson',
    description: 'Introduction to machine learning concepts and algorithms',
    status: 'published',
  },
  {
    id: 'content-10',
    title: 'Sample: Cloud Architecture Patterns',
    url: 'https://example.com/cloud-patterns',
    format: 'article',
    topic: 'Cloud',
    subtopics: ['AWS', 'Architecture'],
    length: 4800,
    publishedAt: new Date('2024-02-08'),
    channels: ['blog', 'twitter', 'linkedin'],
    author: 'Demo User: Robert Chen',
    description: 'Explore cloud architecture best practices and design patterns',
    status: 'published',
  },
  {
    id: 'content-11',
    title: 'Sample: Kubernetes in Production',
    url: 'https://example.com/kubernetes-prod',
    format: 'article',
    topic: 'DevOps',
    subtopics: ['Kubernetes', 'Orchestration'],
    length: 6200,
    publishedAt: new Date('2024-02-10'),
    channels: ['blog', 'linkedin'],
    author: 'Demo User: Nicole Taylor',
    description: 'Running Kubernetes clusters in production environments',
    status: 'published',
  },
  {
    id: 'content-12',
    title: 'Sample: Web Accessibility Best Practices',
    url: 'https://example.com/accessibility',
    format: 'article',
    topic: 'Web Development',
    subtopics: ['A11y', 'Frontend'],
    length: 3900,
    publishedAt: new Date('2024-02-12'),
    channels: ['blog', 'twitter'],
    author: 'Demo User: Alex Rivera',
    description: 'Making web applications accessible to all users',
    status: 'published',
  },
  {
    id: 'content-13',
    title: 'Sample: Python Data Science Toolkit',
    url: 'https://example.com/python-datasci',
    format: 'newsletter',
    topic: 'Python',
    subtopics: ['Data Science', 'Analytics'],
    length: 2800,
    publishedAt: new Date('2024-02-14'),
    channels: ['newsletter'],
    author: 'Demo User: Marcus Thompson',
    description: 'Essential Python libraries for data science and analysis',
    status: 'published',
  },
  {
    id: 'content-14',
    title: 'Sample: Next.js Performance Tips',
    url: 'https://example.com/nextjs-perf',
    format: 'social',
    topic: 'React',
    subtopics: ['Next.js', 'Performance'],
    length: 1500,
    publishedAt: new Date('2024-02-16'),
    channels: ['twitter', 'linkedin'],
    author: 'Demo User: Priya Patel',
    description: 'Quick tips to improve Next.js application performance',
    status: 'published',
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

  // ML content (content-9)
  { id: 'a-41', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-01'), views: 3200, engagement: 480, timeOnPage: 580, conversions: 160, clickThroughRate: 0.25 },
  { id: 'a-42', contentId: 'content-9', channel: 'linkedin', date: new Date('2024-02-02'), views: 2200, engagement: 320, timeOnPage: 390, conversions: 110, clickThroughRate: 0.18 },
  { id: 'a-43', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-03'), views: 3400, engagement: 520, timeOnPage: 620, conversions: 170, clickThroughRate: 0.27 },
  { id: 'a-44', contentId: 'content-9', channel: 'linkedin', date: new Date('2024-02-04'), views: 2100, engagement: 300, timeOnPage: 370, conversions: 105, clickThroughRate: 0.17 },
  { id: 'a-45', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-05'), views: 3100, engagement: 460, timeOnPage: 560, conversions: 155, clickThroughRate: 0.24 },

  // Cloud content (content-10)
  { id: 'a-46', contentId: 'content-10', channel: 'blog', date: new Date('2024-02-01'), views: 2450, engagement: 300, timeOnPage: 270, conversions: 98, clickThroughRate: 0.16 },
  { id: 'a-47', contentId: 'content-10', channel: 'twitter', date: new Date('2024-02-02'), views: 1700, engagement: 200, timeOnPage: 190, conversions: 68, clickThroughRate: 0.12 },
  { id: 'a-48', contentId: 'content-10', channel: 'linkedin', date: new Date('2024-02-03'), views: 2100, engagement: 260, timeOnPage: 235, conversions: 84, clickThroughRate: 0.14 },
  { id: 'a-49', contentId: 'content-10', channel: 'blog', date: new Date('2024-02-04'), views: 2350, engagement: 290, timeOnPage: 260, conversions: 94, clickThroughRate: 0.155 },
  { id: 'a-50', contentId: 'content-10', channel: 'twitter', date: new Date('2024-02-05'), views: 1800, engagement: 220, timeOnPage: 205, conversions: 72, clickThroughRate: 0.13 },
];

export const mockInsights = {
  highConvertingTopics: [
    { topic: 'AI/ML', conversion: 25.2, trend: 'up', status: 'Demo Data' },
    { topic: 'TypeScript', conversion: 23.1, trend: 'up', status: 'Demo Data' },
    { topic: 'JavaScript', conversion: 20.5, trend: 'stable', status: 'Demo Data' },
    { topic: 'Node.js', conversion: 16.3, trend: 'up', status: 'Demo Data' },
    { topic: 'React', conversion: 15.7, trend: 'stable', status: 'Demo Data' },
  ],
  emergingTrends: [
    { trend: 'Machine Learning & AI', momentum: 92, source: 'Sample Data' },
    { trend: 'Cloud Architecture', momentum: 87, source: 'Sample Data' },
    { trend: 'TypeScript Adoption', momentum: 78, source: 'Sample Data' },
    { trend: 'DevOps Practices', momentum: 72, source: 'Sample Data' },
    { trend: 'Performance Optimization', momentum: 65, source: 'Sample Data' },
  ],
  contentGaps: [
    { gap: 'Advanced Python Tutorial', priority: 'high', audience: 'Demo: Developers', estimated_demand: '45%' },
    { gap: 'Kubernetes Guide', priority: 'high', audience: 'Demo: DevOps Engineers', estimated_demand: '42%' },
    { gap: 'Web Assembly Deep Dive', priority: 'medium', audience: 'Demo: Frontend Developers', estimated_demand: '38%' },
    { gap: 'GraphQL Subscriptions', priority: 'medium', audience: 'Demo: Backend Developers', estimated_demand: '32%' },
    { gap: 'Microservices Architecture', priority: 'medium', audience: 'Demo: Architects', estimated_demand: '28%' },
  ],
  recommendations: [
    { recommendation: 'Sample: Create AI/ML focused content series', impact: 'High', effort: 'Medium' },
    { recommendation: 'Sample: Expand video content on YouTube', impact: 'High', effort: 'High' },
    { recommendation: 'Sample: Focus on high-converting topics', impact: 'High', effort: 'Low' },
    { recommendation: 'Sample: Increase LinkedIn article publishing', impact: 'Medium', effort: 'Low' },
    { recommendation: 'Sample: Create comprehensive tutorials', impact: 'High', effort: 'Medium' },
  ],
};

export const mockReports = [
  {
    id: 'report-1',
    title: 'Sample: February 2024 Performance Report',
    period: { startDate: new Date('2024-02-01'), endDate: new Date('2024-02-29') },
    createdAt: new Date('2024-02-29'),
    metrics: {
      totalContent: 10,
      totalViews: 105650,
      totalEngagement: 13420,
      avgConversionRate: 16.2,
      topPerformingTopic: 'AI/ML',
      topPerformingFormat: 'Video',
      bestPerformingDay: 'Friday',
    },
    status: 'Completed',
  },
  {
    id: 'report-2',
    title: 'Sample: January 2024 Performance Report',
    period: { startDate: new Date('2024-01-01'), endDate: new Date('2024-01-31') },
    createdAt: new Date('2024-01-31'),
    metrics: {
      totalContent: 8,
      totalViews: 98200,
      totalEngagement: 12450,
      avgConversionRate: 15.8,
      topPerformingTopic: 'React',
      topPerformingFormat: 'Article',
      bestPerformingDay: 'Wednesday',
    },
    status: 'Completed',
  },
  {
    id: 'report-3',
    title: 'Sample: Q1 2024 Quarterly Summary',
    period: { startDate: new Date('2024-01-01'), endDate: new Date('2024-03-31') },
    createdAt: new Date('2024-03-31'),
    metrics: {
      totalContent: 18,
      totalViews: 310500,
      totalEngagement: 41200,
      avgConversionRate: 16.0,
      topPerformingTopic: 'TypeScript',
      topPerformingFormat: 'Video',
      bestPerformingDay: 'Thursday',
    },
    status: 'Completed',
  },
  {
    id: 'report-4',
    title: 'Sample: Content Performance by Channel',
    period: { startDate: new Date('2024-02-01'), endDate: new Date('2024-02-29') },
    createdAt: new Date('2024-02-29'),
    metrics: {
      totalContent: 10,
      channels: { blog: 42500, youtube: 28000, linkedin: 22650, twitter: 12500 },
      avgConversionRate: 16.2,
      topChannel: 'Blog',
      topChannelConversion: 17.2,
    },
    status: 'Completed',
  },
  {
    id: 'report-5',
    title: 'Sample: Topic Analysis Report',
    period: { startDate: new Date('2024-02-01'), endDate: new Date('2024-02-29') },
    createdAt: new Date('2024-02-29'),
    metrics: {
      totalTopics: 7,
      topTopics: [
        { topic: 'AI/ML', views: 21500, engagement: 3200 },
        { topic: 'TypeScript', views: 18200, engagement: 2800 },
        { topic: 'JavaScript', views: 16400, engagement: 2560 },
      ],
      avgConversionRate: 16.2,
    },
    status: 'Completed',
  },
];

export const getTopicPerformance = () => {
  const topicMetrics: {[key: string]: { views: number; engagement: number; conversions: number; count: number }} = {};

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

export const getChannelPerformance = () => {
  const channelMetrics: {[key: string]: { views: number; engagement: number; conversions: number }} = {};

  mockAnalyticsData.forEach(analytic => {
    if (!channelMetrics[analytic.channel]) {
      channelMetrics[analytic.channel] = { views: 0, engagement: 0, conversions: 0 };
    }
    channelMetrics[analytic.channel].views += analytic.views;
    channelMetrics[analytic.channel].engagement += analytic.engagement;
    channelMetrics[analytic.channel].conversions += analytic.conversions;
  });

  return Object.entries(channelMetrics)
    .map(([channel, metrics]) => ({
      channel,
      views: metrics.views,
      engagement: metrics.engagement,
      conversions: metrics.conversions,
      conversionRate: Math.round((metrics.conversions / metrics.views) * 10000) / 100,
    }))
    .sort((a, b) => b.views - a.views);
};
