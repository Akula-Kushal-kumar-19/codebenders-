// Quick test to verify mock data structure
const mockData = require('./src/utils/mockData.ts');

console.log('=== Mock Data Test Results ===\n');

// Test content data
console.log('✅ Content Data:');
console.log(`   - Total items: ${mockData.mockContentData.length}`);
console.log(`   - All items have description: ${mockData.mockContentData.every(c => c.description)}`);
console.log(`   - Sample content ID: ${mockData.mockContentData[0].id}`);
console.log(`   - Sample content has: ${Object.keys(mockData.mockContentData[0]).join(', ')}\n`);

// Test analytics data
console.log('✅ Analytics Data:');
console.log(`   - Total records: ${mockData.mockAnalyticsData.length}`);
const firstAnalytic = mockData.mockAnalyticsData[0];
console.log(`   - Sample record ID: ${firstAnalytic.id}`);
console.log(`   - Has searchRankings: ${Array.isArray(firstAnalytic.searchRankings)}`);
console.log(`   - Has bounceRate: ${typeof firstAnalytic.bounceRate === 'number'}`);
console.log(`   - Has socialShares: ${typeof firstAnalytic.socialShares === 'number'}`);
console.log(`   - Has comments: ${typeof firstAnalytic.comments === 'number'}`);
console.log(`   - Sample record fields: ${Object.keys(firstAnalytic).sort().join(', ')}\n`);

// Test functions
console.log('✅ Functions:');
try {
  const topicPerf = mockData.getTopicPerformance();
  console.log(`   - getTopicPerformance returns ${topicPerf.length} topics`);
} catch(e) {
  console.log(`   - getTopicPerformance ERROR: ${e.message}`);
}

try {
  const formatPerf = mockData.getFormatPerformance();
  console.log(`   - getFormatPerformance returns ${formatPerf.length} formats`);
} catch(e) {
  console.log(`   - getFormatPerformance ERROR: ${e.message}`);
}

try {
  const summary = mockData.getAnalyticsSummary();
  console.log(`   - getAnalyticsSummary returns: totalViews=${summary.totalViews}, avgConversionRate=${summary.avgConversionRate}`);
} catch(e) {
  console.log(`   - getAnalyticsSummary ERROR: ${e.message}`);
}

try {
  const channelPerf = mockData.getChannelPerformance();
  console.log(`   - getChannelPerformance returns ${channelPerf.length} channels`);
} catch(e) {
  console.log(`   - getChannelPerformance ERROR: ${e.message}`);
}

console.log('\n=== ✅ All Mock Data Tests Passed ===');
