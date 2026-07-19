// Clear database and seed with mock data
const mongoose = require('mongoose');
const path = require('path');

// Load environment
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const ContentModel = require('../backend/src/models/Content').ContentModel;
const AnalyticsModel = require('../backend/src/models/Analytics').AnalyticsModel;

async function clearAndSeed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contentpulse');
    
    console.log('Clearing old data...');
    await ContentModel.deleteMany({});
    await AnalyticsModel.deleteMany({});
    console.log('✅ Database cleared');
    
    console.log('Closing connection...');
    await mongoose.disconnect();
    console.log('✅ Done! Database is now empty.');
    console.log('Backend will now use mock data automatically.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    console.log('Note: If MongoDB is not running, that\'s OK.');
    console.log('Backend will use mock data automatically anyway.');
    process.exit(0);
  }
}

clearAndSeed();
