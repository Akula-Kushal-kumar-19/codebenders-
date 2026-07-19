import React, { useState } from 'react';
import { PageHeader, LoadingSpinner, Alert, Table } from '../components';
import { useFetch } from '../hooks';
import api from '../services/api';
import { IReport } from '@contentpulse/shared';
import { FileText } from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);
  const [generating, setGenerating] = useState(false);

  const { data: reportsData, loading: reportsLoading, refetch } = useFetch(() => api.listReports());

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      await api.generateReport();
      alert('Report generation started');
      refetch();
    } catch (error) {
      alert('Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = async (format: 'pdf' | 'csv') => {
    if (!selectedReport) return;
    alert(`Exporting as ${format.toUpperCase()}`);
  };

  const reportColumns = [
    {
      key: 'generatedAt',
      header: 'Generated',
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'period.startDate',
      header: 'Period Start',
      render: (value: any, row: any) => new Date(row.period.startDate).toLocaleDateString(),
    },
    {
      key: 'period.endDate',
      header: 'Period End',
      render: (value: any, row: any) => new Date(row.period.endDate).toLocaleDateString(),
    },
    {
      key: 'recommendations',
      header: 'Recommendations',
      render: (value: any[]) => value?.length || 0,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Bi-weekly content performance reports"
        actions={
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {generating ? 'Generating...' : 'Generate Report'}
          </button>
        }
      />

      {reportsLoading ? (
        <LoadingSpinner fullScreen />
      ) : selectedReport ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedReport(null)}
            className="px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            ← Back to Reports
          </button>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                Report: {new Date(selectedReport.period.startDate).toLocaleDateString()} -{' '}
                {new Date(selectedReport.period.endDate).toLocaleDateString()}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('pdf')}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Top Recommendations</h4>
                <div className="space-y-3">
                  {selectedReport.recommendations.slice(0, 3).map((rec, idx) => (
                    <Alert
                      key={idx}
                      type={rec.priority === 'high' ? 'warning' : 'info'}
                      title={rec.type}
                      message={rec.description}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedReport.topTopics && selectedReport.topTopics.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Top Performing Topics</h4>
                <div className="bg-gray-50 rounded p-4">
                  {selectedReport.topTopics.map((topic, idx) => (
                    <div key={idx} className="py-2 border-b last:border-b-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{topic.topic}</span>
                        <span className="text-gray-600">{topic.avgViews?.toLocaleString()} avg views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedReport.contentGaps && selectedReport.contentGaps.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Content Gaps Identified</h4>
                <div className="bg-yellow-50 rounded p-4 space-y-2">
                  {selectedReport.contentGaps.slice(0, 5).map((gap, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="font-medium">{gap.topic}</span> - {gap.reason}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={reportColumns}
            data={reportsData?.data || []}
            onRowClick={(report) => setSelectedReport(report)}
          />
        </div>
      )}
    </div>
  );
};
