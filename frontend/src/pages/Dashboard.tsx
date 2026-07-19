import React, { useState, useEffect } from 'react';
import { MetricCard, BarChartComponent, PageHeader, LoadingSpinner, Alert } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';

export const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const { data: summary, loading, error: summaryError, refetch } = useFetch(
    () => api.getAnalyticsSummary(dateRange.start, dateRange.end),
    { skipOnMount: false }
  );

  const { data: topTopics, error: topicsError } = useFetch(() => api.getTopicPerformance(5));
  const { data: bestFormats, error: formatsError } = useFetch(() => api.getFormatPerformance(5));

  // Timeout for stuck loading state
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        console.warn('Dashboard loading timeout - API may be unresponsive');
        setLoadingTimeout(true);

      {summaryError && (
        <Alert
          type="error"
          title="Error loading analytics"
          message={summaryError.message}
        />
      )}

      {loadingTimeout && (
        <Alert
          type="error"
          title="Loading Timeout"
          message="The dashboard is taking too long to load. Please check if the backend server is running on port 3001, or try refreshing the page."
        />
      )}



  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Real-time content performance overview"
      />

      {summaryError && (
        <Alert
          type="error"
          title="Error loading analytics"
          message={summaryError.message}
        />
      )}

      {loadingTimeout && (
        <Alert
          type="error"
          title="Loading Timeout"
          message="The dashboard is taking too long to load. Please check if the backend server is running on port 3001, or try refreshing the page."
        />
      )}


      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
        <div className="flex space-x-4">
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: new Date(e.target.value) })
            }
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: new Date(e.target.value) })
            }
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Content"
          value={summary?.data?.totalContent || 0}
          unit="pieces"
        />
        <MetricCard
          title="Total Views"
          value={summary?.data?.totalViews?.toLocaleString?.() || 0}
        />
        <MetricCard
          title="Total Engagement"
          value={summary?.data?.totalEngagement?.toLocaleString?.() || 0}
        />
        <MetricCard
          title="Avg Time on Page"
          value={Math.round(summary?.data?.avgTimeOnPage || 0)}
          unit="seconds"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {topicsError && (
          <Alert type="error" title="Error" message={topicsError.message} />
        )}
        {!topicsError && (
          <BarChartComponent
            title="Performance by Topic"
            data={topTopics?.data || []}
            dataKey="avgViews"
            xAxisKey="topic"
          />
        )}
        
        {formatsError && (
          <Alert type="error" title="Error" message={formatsError.message} />
        )}
        {!formatsError && (
          <BarChartComponent
            title="Performance by Format"
            data={bestFormats?.data || []}
            dataKey="avgViews"
            xAxisKey="format"
          />
        )}
      </div>
    </div>
  );
};
