import React, { useState } from 'react';
import { PageHeader, Alert, LoadingSpinner } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';
import { Recommendation, ContentGap } from '@contentpulse/shared';

export const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'trends' | 'gaps'>('topics');

  const { data: topicsData, loading: topicsLoading } = useFetch(() => api.getHighConvertingTopics(5));
  const { data: trendsData, loading: trendsLoading } = useFetch(() => api.getEmergingTrends());
  const { data: gapsData, loading: gapsLoading } = useFetch(() => api.getContentGaps());

  return (
    <div>
      <PageHeader
        title="AI Insights"
        subtitle="Machine learning-powered content intelligence"
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
              High-Converting Topics
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Emerging Trends
            </button>
            <button
              onClick={() => setActiveTab('gaps')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'gaps'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Content Gaps
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'topics' && (
        <div className="space-y-4">
          {topicsLoading ? (
            <LoadingSpinner />
          ) : (
            (topicsData?.data || []).map((rec: Recommendation, idx: number) => (
              <Alert
                key={idx}
                type={rec.priority === 'high' ? 'success' : 'info'}
                title={rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                message={`${rec.description} (Confidence: ${(rec.confidenceScore * 100).toFixed(0)}%)`}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-4">
          {trendsLoading ? (
            <LoadingSpinner />
          ) : (
            (trendsData?.data || []).map((insight: any, idx: number) => (
              <Alert
                key={idx}
                type="info"
                title={insight.title}
                message={insight.description}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'gaps' && (
        <div className="space-y-4">
          {gapsLoading ? (
            <LoadingSpinner />
          ) : (
            (gapsData?.data || []).map((gap: ContentGap, idx: number) => (
              <Alert
                key={idx}
                type={gap.priority === 'high' ? 'warning' : 'info'}
                title={`Content Gap: ${gap.topic}`}
                message={`${gap.reason} (Search Volume: ${gap.searchVolume?.toLocaleString()})`}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
