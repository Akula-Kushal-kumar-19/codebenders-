import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/contentpulse',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  
  // AI Services
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  
  // Channel APIs
  GOOGLE_ANALYTICS_KEY: process.env.GOOGLE_ANALYTICS_KEY,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  MEDIUM_API_TOKEN: process.env.MEDIUM_API_TOKEN,
  LINKEDIN_ACCESS_TOKEN: process.env.LINKEDIN_ACCESS_TOKEN,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  SUBSTACK_API_KEY: process.env.SUBSTACK_API_KEY,
  
  // Report Generation
  REPORT_GENERATION_INTERVAL: 14 * 24 * 60 * 60 * 1000, // 14 days
  ANALYTICS_SYNC_INTERVAL: 6 * 60 * 60 * 1000, // 6 hours
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default config;
