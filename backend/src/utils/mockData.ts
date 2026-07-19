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
  { id: 'a-1', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-01'), views: 2350, engagement: 290, timeOnPage: 245, conversions: 95, clickThroughRate: 0.15, searchRankings: [3, 5, 7], bounceRate: 0.32, socialShares: 145, comments: 28 },
  { id: 'a-2', contentId: 'content-1', channel: 'linkedin', date: new Date('2024-02-02'), views: 1800, engagement: 220, timeOnPage: 200, conversions: 72, clickThroughRate: 0.12, searchRankings: [5, 8, 12], bounceRate: 0.38, socialShares: 98, comments: 15 },
  { id: 'a-3', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-03'), views: 2100, engagement: 260, timeOnPage: 230, conversions: 84, clickThroughRate: 0.14, searchRankings: [2, 4, 6], bounceRate: 0.29, socialShares: 132, comments: 24 },
  { id: 'a-4', contentId: 'content-1', channel: 'linkedin', date: new Date('2024-02-04'), views: 1950, engagement: 240, timeOnPage: 210, conversions: 78, clickThroughRate: 0.13, searchRankings: [4, 7, 10], bounceRate: 0.35, socialShares: 112, comments: 18 },
  { id: 'a-5', contentId: 'content-1', channel: 'blog', date: new Date('2024-02-05'), views: 2200, engagement: 270, timeOnPage: 240, conversions: 88, clickThroughRate: 0.145, searchRankings: [1, 3, 5], bounceRate: 0.27, socialShares: 156, comments: 31 },
  
  // Node.js content (content-2)
  { id: 'a-6', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-01'), views: 2280, engagement: 310, timeOnPage: 260, conversions: 91, clickThroughRate: 0.16, searchRankings: [2, 6, 9], bounceRate: 0.31, socialShares: 168, comments: 35 },
  { id: 'a-7', contentId: 'content-2', channel: 'twitter', date: new Date('2024-02-02'), views: 1650, engagement: 200, timeOnPage: 180, conversions: 66, clickThroughRate: 0.11, searchRankings: [7, 11, 15], bounceRate: 0.42, socialShares: 78, comments: 12 },
  { id: 'a-8', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-03'), views: 2400, engagement: 330, timeOnPage: 275, conversions: 96, clickThroughRate: 0.17, searchRankings: [1, 5, 8], bounceRate: 0.28, socialShares: 185, comments: 42 },
  { id: 'a-9', contentId: 'content-2', channel: 'twitter', date: new Date('2024-02-04'), views: 1500, engagement: 180, timeOnPage: 160, conversions: 60, clickThroughRate: 0.10, searchRankings: [8, 13, 16], bounceRate: 0.45, socialShares: 65, comments: 9 },
  { id: 'a-10', contentId: 'content-2', channel: 'blog', date: new Date('2024-02-05'), views: 2350, engagement: 300, timeOnPage: 255, conversions: 94, clickThroughRate: 0.155, searchRankings: [3, 7, 11], bounceRate: 0.30, socialShares: 152, comments: 28 },
  
  // TypeScript content (content-3) - video
  { id: 'a-11', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-01'), views: 3100, engagement: 450, timeOnPage: 520, conversions: 155, clickThroughRate: 0.22, searchRankings: [1, 4, 8], bounceRate: 0.25, socialShares: 267, comments: 85 },
  { id: 'a-12', contentId: 'content-3', channel: 'linkedin', date: new Date('2024-02-02'), views: 2050, engagement: 280, timeOnPage: 350, conversions: 102, clickThroughRate: 0.15, searchRankings: [3, 8, 12], bounceRate: 0.33, socialShares: 142, comments: 38 },
  { id: 'a-13', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-03'), views: 3250, engagement: 480, timeOnPage: 560, conversions: 162, clickThroughRate: 0.23, searchRankings: [2, 5, 9], bounceRate: 0.22, socialShares: 298, comments: 96 },
  { id: 'a-14', contentId: 'content-3', channel: 'linkedin', date: new Date('2024-02-04'), views: 1950, engagement: 260, timeOnPage: 330, conversions: 97, clickThroughRate: 0.14, searchRankings: [4, 9, 14], bounceRate: 0.36, socialShares: 118, comments: 22 },
  { id: 'a-15', contentId: 'content-3', channel: 'youtube', date: new Date('2024-02-05'), views: 3000, engagement: 420, timeOnPage: 500, conversions: 150, clickThroughRate: 0.21, searchRankings: [1, 3, 7], bounceRate: 0.24, socialShares: 268, comments: 72 },
  
  // Web Performance content (content-4)
  { id: 'a-16', contentId: 'content-4', channel: 'blog', date: new Date('2024-02-01'), views: 1850, engagement: 220, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125, searchRankings: [4, 9, 13], bounceRate: 0.34, socialShares: 105, comments: 18 },
  { id: 'a-17', contentId: 'content-4', channel: 'twitter', date: new Date('2024-02-02'), views: 1400, engagement: 160, timeOnPage: 150, conversions: 56, clickThroughRate: 0.095, searchRankings: [10, 15, 20], bounceRate: 0.48, socialShares: 62, comments: 8 },
  { id: 'a-18', contentId: 'content-4', channel: 'linkedin', date: new Date('2024-02-03'), views: 1600, engagement: 190, timeOnPage: 180, conversions: 64, clickThroughRate: 0.11, searchRankings: [6, 11, 16], bounceRate: 0.40, socialShares: 88, comments: 14 },
  { id: 'a-19', contentId: 'content-4', channel: 'blog', date: new Date('2024-02-04'), views: 2000, engagement: 240, timeOnPage: 230, conversions: 80, clickThroughRate: 0.135, searchRankings: [3, 8, 12], bounceRate: 0.31, socialShares: 125, comments: 22 },
  { id: 'a-20', contentId: 'content-4', channel: 'twitter', date: new Date('2024-02-05'), views: 1550, engagement: 180, timeOnPage: 170, conversions: 62, clickThroughRate: 0.105, searchRankings: [9, 14, 18], bounceRate: 0.46, socialShares: 71, comments: 10 },
  
  // GraphQL content (content-5)
  { id: 'a-21', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-01'), views: 1950, engagement: 250, timeOnPage: 215, conversions: 78, clickThroughRate: 0.13, searchRankings: [5, 10, 14], bounceRate: 0.33, socialShares: 118, comments: 21 },
  { id: 'a-22', contentId: 'content-5', channel: 'linkedin', date: new Date('2024-02-02'), views: 1750, engagement: 210, timeOnPage: 195, conversions: 70, clickThroughRate: 0.12, searchRankings: [7, 12, 17], bounceRate: 0.39, socialShares: 92, comments: 16 },
  { id: 'a-23', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-03'), views: 2050, engagement: 270, timeOnPage: 230, conversions: 82, clickThroughRate: 0.14, searchRankings: [4, 8, 11], bounceRate: 0.30, socialShares: 135, comments: 27 },
  { id: 'a-24', contentId: 'content-5', channel: 'linkedin', date: new Date('2024-02-04'), views: 1650, engagement: 200, timeOnPage: 185, conversions: 66, clickThroughRate: 0.11, searchRankings: [8, 13, 18], bounceRate: 0.42, socialShares: 78, comments: 12 },
  { id: 'a-25', contentId: 'content-5', channel: 'blog', date: new Date('2024-02-05'), views: 1900, engagement: 240, timeOnPage: 210, conversions: 76, clickThroughRate: 0.125, searchRankings: [6, 11, 15], bounceRate: 0.32, socialShares: 108, comments: 19 },
  
  // JavaScript content (content-6) - video
  { id: 'a-26', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-01'), views: 2850, engagement: 380, timeOnPage: 450, conversions: 142, clickThroughRate: 0.20, searchRankings: [2, 6, 10], bounceRate: 0.26, socialShares: 235, comments: 62 },
  { id: 'a-27', contentId: 'content-6', channel: 'linkedin', date: new Date('2024-02-02'), views: 1900, engagement: 240, timeOnPage: 300, conversions: 95, clickThroughRate: 0.14, searchRankings: [5, 9, 13], bounceRate: 0.34, socialShares: 128, comments: 28 },
  { id: 'a-28', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-03'), views: 2950, engagement: 400, timeOnPage: 480, conversions: 147, clickThroughRate: 0.21, searchRankings: [1, 5, 9], bounceRate: 0.23, socialShares: 268, comments: 71 },
  { id: 'a-29', contentId: 'content-6', channel: 'linkedin', date: new Date('2024-02-04'), views: 2000, engagement: 260, timeOnPage: 320, conversions: 100, clickThroughRate: 0.15, searchRankings: [4, 8, 12], bounceRate: 0.31, socialShares: 145, comments: 31 },
  { id: 'a-30', contentId: 'content-6', channel: 'youtube', date: new Date('2024-02-05'), views: 2750, engagement: 360, timeOnPage: 430, conversions: 137, clickThroughRate: 0.195, searchRankings: [3, 7, 11], bounceRate: 0.25, socialShares: 242, comments: 58 },
  
  // CSS content (content-7)
  { id: 'a-31', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-01'), views: 1700, engagement: 200, timeOnPage: 190, conversions: 68, clickThroughRate: 0.115, searchRankings: [6, 11, 15], bounceRate: 0.36, socialShares: 95, comments: 14 },
  { id: 'a-32', contentId: 'content-7', channel: 'twitter', date: new Date('2024-02-02'), views: 1300, engagement: 150, timeOnPage: 140, conversions: 52, clickThroughRate: 0.09, searchRankings: [12, 17, 22], bounceRate: 0.50, socialShares: 45, comments: 6 },
  { id: 'a-33', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-03'), views: 1850, engagement: 220, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125, searchRankings: [5, 10, 14], bounceRate: 0.33, socialShares: 110, comments: 18 },
  { id: 'a-34', contentId: 'content-7', channel: 'twitter', date: new Date('2024-02-04'), views: 1450, engagement: 170, timeOnPage: 160, conversions: 58, clickThroughRate: 0.10, searchRankings: [11, 16, 20], bounceRate: 0.47, socialShares: 54, comments: 8 },
  { id: 'a-35', contentId: 'content-7', channel: 'blog', date: new Date('2024-02-05'), views: 1750, engagement: 210, timeOnPage: 195, conversions: 70, clickThroughRate: 0.12, searchRankings: [7, 12, 16], bounceRate: 0.34, socialShares: 98, comments: 15 },
  
  // DevOps content (content-8)
  { id: 'a-36', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-01'), views: 2150, engagement: 280, timeOnPage: 240, conversions: 86, clickThroughRate: 0.14, searchRankings: [3, 8, 12], bounceRate: 0.32, socialShares: 132, comments: 26 },
  { id: 'a-37', contentId: 'content-8', channel: 'linkedin', date: new Date('2024-02-02'), views: 1850, engagement: 230, timeOnPage: 210, conversions: 74, clickThroughRate: 0.125, searchRankings: [6, 11, 15], bounceRate: 0.37, socialShares: 105, comments: 19 },
  { id: 'a-38', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-03'), views: 2300, engagement: 310, timeOnPage: 260, conversions: 92, clickThroughRate: 0.15, searchRankings: [2, 7, 11], bounceRate: 0.29, socialShares: 158, comments: 33 },
  { id: 'a-39', contentId: 'content-8', channel: 'linkedin', date: new Date('2024-02-04'), views: 2000, engagement: 260, timeOnPage: 230, conversions: 80, clickThroughRate: 0.135, searchRankings: [5, 10, 14], bounceRate: 0.34, socialShares: 128, comments: 23 },
  { id: 'a-40', contentId: 'content-8', channel: 'blog', date: new Date('2024-02-05'), views: 2200, engagement: 290, timeOnPage: 250, conversions: 88, clickThroughRate: 0.145, searchRankings: [4, 9, 13], bounceRate: 0.30, socialShares: 142, comments: 28 },

  // ML content (content-9)
  { id: 'a-41', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-01'), views: 3200, engagement: 480, timeOnPage: 580, conversions: 160, clickThroughRate: 0.25, searchRankings: [1, 5, 9], bounceRate: 0.22, socialShares: 312, comments: 98 },
  { id: 'a-42', contentId: 'content-9', channel: 'linkedin', date: new Date('2024-02-02'), views: 2200, engagement: 320, timeOnPage: 390, conversions: 110, clickThroughRate: 0.18, searchRankings: [4, 10, 15], bounceRate: 0.28, socialShares: 168, comments: 42 },
  { id: 'a-43', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-03'), views: 3400, engagement: 520, timeOnPage: 620, conversions: 170, clickThroughRate: 0.27, searchRankings: [1, 4, 8], bounceRate: 0.20, socialShares: 345, comments: 112 },
  { id: 'a-44', contentId: 'content-9', channel: 'linkedin', date: new Date('2024-02-04'), views: 2100, engagement: 300, timeOnPage: 370, conversions: 105, clickThroughRate: 0.17, searchRankings: [5, 11, 16], bounceRate: 0.30, socialShares: 155, comments: 38 },
  { id: 'a-45', contentId: 'content-9', channel: 'youtube', date: new Date('2024-02-05'), views: 3100, engagement: 460, timeOnPage: 560, conversions: 155, clickThroughRate: 0.24, searchRankings: [2, 6, 10], bounceRate: 0.23, socialShares: 298, comments: 85 },

  // Cloud content (content-10)
  { id: 'a-46', contentId: 'content-10', channel: 'blog', date: new Date('2024-02-01'), views: 2450, engagement: 300, timeOnPage: 270, conversions: 98, clickThroughRate: 0.16, searchRankings: [2, 7, 11], bounceRate: 0.30, socialShares: 165, comments: 35 },
  { id: 'a-47', contentId: 'content-10', channel: 'twitter', date: new Date('2024-02-02'), views: 1700, engagement: 200, timeOnPage: 190, conversions: 68, clickThroughRate: 0.12, searchRankings: [9, 14, 19], bounceRate: 0.43, socialShares: 78, comments: 11 },
  { id: 'a-48', contentId: 'content-10', channel: 'linkedin', date: new Date('2024-02-03'), views: 2100, engagement: 260, timeOnPage: 235, conversions: 84, clickThroughRate: 0.14, searchRankings: [4, 9, 13], bounceRate: 0.35, socialShares: 125, comments: 24 },
  { id: 'a-49', contentId: 'content-10', channel: 'blog', date: new Date('2024-02-04'), views: 2350, engagement: 290, timeOnPage: 260, conversions: 94, clickThroughRate: 0.155, searchRankings: [3, 8, 12], bounceRate: 0.31, socialShares: 148, comments: 29 },
  { id: 'a-50', contentId: 'content-10', channel: 'twitter', date: new Date('2024-02-05'), views: 1800, engagement: 220, timeOnPage: 205, conversions: 72, clickThroughRate: 0.13, searchRankings: [8, 13, 17], bounceRate: 0.41, socialShares: 85, comments: 13 },

  // Kubernetes content (content-11)
  { id: 'a-51', contentId: 'content-11', channel: 'blog', date: new Date('2024-02-01'), views: 2200, engagement: 290, timeOnPage: 260, conversions: 88, clickThroughRate: 0.145, searchRankings: [3, 8, 12], bounceRate: 0.31, socialShares: 142, comments: 27 },
  { id: 'a-52', contentId: 'content-11', channel: 'linkedin', date: new Date('2024-02-02'), views: 1900, engagement: 250, timeOnPage: 220, conversions: 76, clickThroughRate: 0.125, searchRankings: [6, 11, 15], bounceRate: 0.36, socialShares: 115, comments: 22 },
  { id: 'a-53', contentId: 'content-11', channel: 'blog', date: new Date('2024-02-03'), views: 2350, engagement: 310, timeOnPage: 280, conversions: 94, clickThroughRate: 0.155, searchRankings: [2, 7, 11], bounceRate: 0.28, socialShares: 168, comments: 35 },
  { id: 'a-54', contentId: 'content-11', channel: 'linkedin', date: new Date('2024-02-04'), views: 2050, engagement: 270, timeOnPage: 240, conversions: 82, clickThroughRate: 0.135, searchRankings: [5, 10, 14], bounceRate: 0.33, socialShares: 132, comments: 25 },
  { id: 'a-55', contentId: 'content-11', channel: 'blog', date: new Date('2024-02-05'), views: 2300, engagement: 300, timeOnPage: 270, conversions: 92, clickThroughRate: 0.15, searchRankings: [4, 9, 13], bounceRate: 0.29, socialShares: 155, comments: 31 },

  // Accessibility content (content-12)
  { id: 'a-56', contentId: 'content-12', channel: 'blog', date: new Date('2024-02-01'), views: 1650, engagement: 210, timeOnPage: 200, conversions: 66, clickThroughRate: 0.11, searchRankings: [7, 12, 16], bounceRate: 0.37, socialShares: 98, comments: 16 },
  { id: 'a-57', contentId: 'content-12', channel: 'twitter', date: new Date('2024-02-02'), views: 1200, engagement: 140, timeOnPage: 130, conversions: 48, clickThroughRate: 0.085, searchRankings: [14, 19, 24], bounceRate: 0.52, socialShares: 52, comments: 7 },
  { id: 'a-58', contentId: 'content-12', channel: 'blog', date: new Date('2024-02-03'), views: 1800, engagement: 230, timeOnPage: 215, conversions: 72, clickThroughRate: 0.12, searchRankings: [6, 11, 15], bounceRate: 0.34, socialShares: 112, comments: 20 },
  { id: 'a-59', contentId: 'content-12', channel: 'twitter', date: new Date('2024-02-04'), views: 1350, engagement: 160, timeOnPage: 145, conversions: 54, clickThroughRate: 0.095, searchRankings: [13, 18, 22], bounceRate: 0.49, socialShares: 63, comments: 9 },
  { id: 'a-60', contentId: 'content-12', channel: 'blog', date: new Date('2024-02-05'), views: 1700, engagement: 220, timeOnPage: 205, conversions: 68, clickThroughRate: 0.115, searchRankings: [8, 13, 17], bounceRate: 0.35, socialShares: 105, comments: 18 },

  // Python Data Science content (content-13)
  { id: 'a-61', contentId: 'content-13', channel: 'newsletter', date: new Date('2024-02-01'), views: 1400, engagement: 320, timeOnPage: 180, conversions: 70, clickThroughRate: 0.22, searchRankings: [5, 11, 16], bounceRate: 0.28, socialShares: 220, comments: 45 },
  { id: 'a-62', contentId: 'content-13', channel: 'newsletter', date: new Date('2024-02-02'), views: 1550, engagement: 350, timeOnPage: 200, conversions: 78, clickThroughRate: 0.25, searchRankings: [3, 9, 14], bounceRate: 0.25, socialShares: 245, comments: 52 },
  { id: 'a-63', contentId: 'content-13', channel: 'newsletter', date: new Date('2024-02-03'), views: 1650, engagement: 370, timeOnPage: 210, conversions: 83, clickThroughRate: 0.27, searchRankings: [2, 8, 13], bounceRate: 0.23, socialShares: 268, comments: 58 },
  { id: 'a-64', contentId: 'content-13', channel: 'newsletter', date: new Date('2024-02-04'), views: 1480, engagement: 340, timeOnPage: 190, conversions: 74, clickThroughRate: 0.23, searchRankings: [4, 10, 15], bounceRate: 0.26, socialShares: 235, comments: 48 },
  { id: 'a-65', contentId: 'content-13', channel: 'newsletter', date: new Date('2024-02-05'), views: 1600, engagement: 360, timeOnPage: 205, conversions: 80, clickThroughRate: 0.26, searchRankings: [3, 9, 14], bounceRate: 0.24, socialShares: 252, comments: 54 },

  // Next.js content (content-14)
  { id: 'a-66', contentId: 'content-14', channel: 'twitter', date: new Date('2024-02-01'), views: 2850, engagement: 480, timeOnPage: 95, conversions: 114, clickThroughRate: 0.18, searchRankings: [4, 9, 13], bounceRate: 0.38, socialShares: 425, comments: 68 },
  { id: 'a-67', contentId: 'content-14', channel: 'linkedin', date: new Date('2024-02-02'), views: 2100, engagement: 380, timeOnPage: 80, conversions: 84, clickThroughRate: 0.14, searchRankings: [7, 12, 17], bounceRate: 0.42, socialShares: 312, comments: 45 },
  { id: 'a-68', contentId: 'content-14', channel: 'twitter', date: new Date('2024-02-03'), views: 3050, engagement: 520, timeOnPage: 105, conversions: 122, clickThroughRate: 0.20, searchRankings: [3, 8, 12], bounceRate: 0.36, socialShares: 468, comments: 75 },
  { id: 'a-69', contentId: 'content-14', channel: 'linkedin', date: new Date('2024-02-04'), views: 2250, engagement: 410, timeOnPage: 90, conversions: 90, clickThroughRate: 0.16, searchRankings: [6, 11, 15], bounceRate: 0.40, socialShares: 340, comments: 52 },
  { id: 'a-70', contentId: 'content-14', channel: 'twitter', date: new Date('2024-02-05'), views: 2950, engagement: 495, timeOnPage: 100, conversions: 118, clickThroughRate: 0.19, searchRankings: [5, 10, 14], bounceRate: 0.37, socialShares: 442, comments: 70 },
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
