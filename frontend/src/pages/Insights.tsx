import React, { useState } from 'react';
import { PageHeader, Alert, LoadingSpinner } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';
import { Recommendation, ContentGap } from '@contentpulse/shared';

export const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'topics' | 'trends' | 'gaps'>('topics');

  const { data: topicsData, loading: topicsLoading, error: topicsError } = useFetch(() => api.getHighConvertingTopics(5));
  const { data: trendsData, loading: trendsLoading, error: trendsError } = useFetch(() => api.getEmergingTrends());
  const { data: gapsData, loading: gapsLoading, error: gapsError } = useFetch(() => api.getContentGaps());

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
          {topicsError && (
            <Alert
              type="error"
              title="Error loading topics"
              message={topicsError.message}
            />
          )}
          {topicsLoading ? (
            <LoadingSpinner />
          ) : (
            (topicsData?.data || []).map((rec: Recommendation, idx: number) => (
              <Alert
                key={idx}
                type={rec.priority === 'high' ? 'success' : 'info'}
                title={rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                message={`${rec.description} (Confidence: ${((rec.confidenceScore || 0) * 100).toFixed(0)}%)`}
              />
            ))
          )}
          {!topicsLoading && (!topicsData?.data || topicsData.data.length === 0) && !topicsError && (
            <Alert
              type="info"
              title="No Data"
              message="No topic recommendations available yet"
            />
          )}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-4">
          {trendsError && (
            <Alert
              type="error"
              title="Error loading trends"
              message={trendsError.message}
            />
          )}
          {trendsLoading ? (
            <LoadingSpinner />
          ) : (
            (trendsData?.data || []).map((insight: any, idx: number) => (
              <Alert
                key={idx}
                type="info"
                title={insight.title || 'Trend'}
                message={insight.description || 'No description'}
              />
            ))
          )}
          {!trendsLoading && (!trendsData?.data || trendsData.data.length === 0) && !trendsError && (
            <Alert
              type="info"
              title="No Data"
              message="No trend data available yet"
            />
          )}
        </div>
      )}

      {activeTab === 'gaps' && (
        <div className="space-y-4">
          {gapsError && (
            <Alert
              type="error"
              title="Error loading gaps"
              message={gapsError.message}
            />
          )}
          {gapsLoading ? (
            <LoadingSpinner />
          ) : (
            (gapsData?.data || []).map((gap: ContentGap, idx: number) => (
              <Alert
                key={idx}
                type={gap.priority === 'high' ? 'warning' : 'info'}
                title={`Content Gap: ${gap.topic}`}
                message={`${gap.reason} (Search Volume: ${gap.searchVolume?.toLocaleString?.()})`}
              />
            ))
          )}
          {!gapsLoading && (!gapsData?.data || gapsData.data.length === 0) && !gapsError && (
            <Alert
              type="info"
              title="No Data"
              message="No content gaps identified"
            />
          )}
        </div>
      )}
    </div>
  );
};
