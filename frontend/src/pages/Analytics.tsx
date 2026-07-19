import React, { useState } from 'react';
import { PageHeader, Table, LoadingSpinner, Alert } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'formats'>('topics');

  const { data: topicData, loading: topicLoading } = useFetch(() => api.getTopicPerformance(20));
  const { data: formatData, loading: formatLoading } = useFetch(() => api.getFormatPerformance(20));

  const handleSync = async () => {
    try {
      await api.syncChannels();
      alert('Analytics sync initiated');
    } catch (error) {
      alert('Failed to sync analytics');
    }
  };

  const topicColumns = [
    { key: 'topic', header: 'Topic' },
    {
      key: 'avgViews',
      header: 'Avg Views',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'avgEngagement',
      header: 'Avg Engagement',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'conversionRate',
      header: 'Conversion Rate',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
    },
  ];

  const formatColumns = [
    { key: 'format', header: 'Format' },
    {
      key: 'count',
      header: 'Content Count',
    },
    {
      key: 'avgViews',
      header: 'Avg Views',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'conversionRate',
      header: 'Conversion Rate',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Detailed content and channel analytics"
        actions={
          <button
            onClick={handleSync}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sync Channels
          </button>
        }
      />

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('topics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'topics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => setActiveTab('formats')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'formats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Formats
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'topics' && (
        <div>
          {topicLoading ? (
            <LoadingSpinner />
          ) : (
            <Table
              columns={topicColumns}
              data={topicData?.data || []}
            />
          )}
        </div>
      )}

      {activeTab === 'formats' && (
        <div>
          {formatLoading ? (
            <LoadingSpinner />
          ) : (
            <Table
              columns={formatColumns}
              data={formatData?.data || []}
            />
          )}
        </div>
      )}
    </div>
  );
};
