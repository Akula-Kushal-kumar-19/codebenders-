import React, { useEffect, useState } from 'react';
import { MetricCard, BarChartComponent, LineChartComponent, PageHeader, LoadingSpinner } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';

export const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  const { data: summary, loading, refetch } = useFetch(
    () => api.getAnalyticsSummary(dateRange.start, dateRange.end),
    { skipOnMount: false }
  );

  const { data: topTopics } = useFetch(() => api.getTopicPerformance(5));
  const { data: bestFormats } = useFetch(() => api.getFormatPerformance(5));

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Real-time content performance overview"
      />

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
          value={summary?.data?.totalViews?.toLocaleString() || 0}
        />
        <MetricCard
          title="Total Engagement"
          value={summary?.data?.totalEngagement?.toLocaleString() || 0}
        />
        <MetricCard
          title="Avg Time on Page"
          value={Math.round(summary?.data?.avgTimeOnPage || 0)}
          unit="seconds"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChartComponent
          title="Performance by Topic"
          data={topTopics?.data || []}
          dataKey="avgViews"
          xAxisKey="topic"
        />
        <BarChartComponent
          title="Performance by Format"
          data={bestFormats?.data || []}
          dataKey="avgViews"
          xAxisKey="format"
        />
      </div>
    </div>
  );
};
