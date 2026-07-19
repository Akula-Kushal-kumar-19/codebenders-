import mongoose from 'mongoose';
import config from '../src/config';
import { ContentModel } from '../src/models/Content';
import { AnalyticsModel } from '../src/models/Analytics';
import { generateId } from '../src/utils';

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await ContentModel.deleteMany({});
    await AnalyticsModel.deleteMany({});
    console.log('Cleared existing data');

    // Seed content data
    const contents = [
      {
        id: generateId(),
        title: 'Getting Started with React Hooks',
        url: 'https://example.com/react-hooks',
        format: 'article',
        topic: 'React',
        subtopics: ['Hooks', 'React 18'],
        length: 3500,
        publishedAt: new Date('2024-01-15'),
        channels: ['blog', 'linkedin'],
        author: 'John Doe',
        description: 'Learn how to use React Hooks effectively',
      },
      {
        id: generateId(),
        title: 'Node.js Best Practices 2024',
        url: 'https://example.com/nodejs-practices',
        format: 'article',
        topic: 'Node.js',
        subtopics: ['Backend', 'Performance'],
        length: 4200,
        publishedAt: new Date('2024-01-18'),
        channels: ['blog', 'twitter'],
        author: 'Jane Smith',
        description: 'Comprehensive guide to Node.js best practices',
      },
      {
        id: generateId(),
        title: 'TypeScript Tutorial for Beginners',
        url: 'https://example.com/typescript-tutorial',
        format: 'video',
        topic: 'TypeScript',
        subtopics: ['Web Development', 'Types'],
        length: 8000,
        publishedAt: new Date('2024-01-20'),
        channels: ['youtube', 'linkedin'],
        author: 'Mike Johnson',
        description: 'Complete TypeScript guide from zero to hero',
      },
      {
        id: generateId(),
        title: 'Web Performance Optimization',
        url: 'https://example.com/web-performance',
        format: 'article',
        topic: 'Web Performance',
        subtopics: ['Frontend', 'Optimization'],
        length: 5100,
        publishedAt: new Date('2024-01-22'),
        channels: ['blog', 'twitter', 'linkedin'],
        author: 'Sarah Davis',
        description: 'Tips and tricks for faster websites',
      },
      {
        id: generateId(),
        title: 'GraphQL vs REST APIs',
        url: 'https://example.com/graphql-vs-rest',
        format: 'article',
        topic: 'GraphQL',
        subtopics: ['APIs', 'Backend'],
        length: 3800,
        publishedAt: new Date('2024-01-25'),
        channels: ['blog', 'linkedin'],
        author: 'Tom Wilson',
        description: 'Comparing GraphQL and REST approaches',
      },
      {
        id: generateId(),
        title: 'JavaScript Async/Await Explained',
        url: 'https://example.com/async-await',
        format: 'video',
        topic: 'JavaScript',
        subtopics: ['Async', 'Promises'],
        length: 6500,
        publishedAt: new Date('2024-01-28'),
        channels: ['youtube', 'linkedin'],
        author: 'Emily Brown',
        description: 'Master asynchronous JavaScript',
      },
      {
        id: generateId(),
        title: 'CSS Grid Layout Deep Dive',
        url: 'https://example.com/css-grid',
        format: 'article',
        topic: 'CSS',
        subtopics: ['Frontend', 'Layout'],
        length: 4000,
        publishedAt: new Date('2024-02-01'),
        channels: ['blog', 'twitter'],
        author: 'Chris Martin',
        description: 'Master CSS Grid for complex layouts',
      },
      {
        id: generateId(),
        title: 'Docker Containerization Guide',
        url: 'https://example.com/docker-guide',
        format: 'article',
        topic: 'DevOps',
        subtopics: ['Docker', 'Containers'],
        length: 5500,
        publishedAt: new Date('2024-02-03'),
        channels: ['blog', 'linkedin'],
        author: 'David Lee',
        description: 'Complete Docker setup and best practices',
      },
    ];

    const createdContents = await ContentModel.insertMany(contents);
    console.log(`Seeded ${createdContents.length} content items`);

    // Seed analytics data
    const analytics = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    for (const content of createdContents) {
      // Create multiple analytics records for each content
      for (let i = 0; i < 5; i++) {
        const date = new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()));
        const views = Math.floor(Math.random() * 5000) + 500;
        const engagement = Math.floor(Math.random() * 500) + 50;

        analytics.push({
          id: generateId(),
          contentId: content.id,
          channel: content.channels[Math.floor(Math.random() * content.channels.length)],
          date,
          views,
          engagement,
          timeOnPage: Math.floor(Math.random() * 600) + 60,
          conversions: Math.floor(views * (Math.random() * 0.1 + 0.02)),
          clickThroughRate: Math.random() * 0.3 + 0.05,
          searchRankings: [Math.floor(Math.random() * 10) + 1],
          bounceRate: Math.random() * 0.5 + 0.1,
          socialShares: Math.floor(Math.random() * 200) + 10,
          comments: Math.floor(Math.random() * 50) + 5,
        });
      }
    }

    await AnalyticsModel.insertMany(analytics);
    console.log(`Seeded ${analytics.length} analytics records`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
