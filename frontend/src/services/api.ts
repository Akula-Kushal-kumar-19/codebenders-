import axios, { AxiosInstance } from 'axios';
import { IContent, IAnalytics, IReport, IContentPrediction, ContentGap } from '@contentpulse/shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Content endpoints
  async createContent(data: Omit<IContent, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await this.client.post('/content', data);
    return response.data;
  }

  async getContent(id: string) {
    const response = await this.client.get(`/content/${id}`);
    return response.data;
  }

  async getContentPerformance(id: string, startDate?: Date, endDate?: Date) {
    const response = await this.client.get(`/content/${id}/performance`, {
      params: { startDate, endDate },
    });
    return response.data;
  }

  async listContent(page: number = 1, limit: number = 20, topic?: string, format?: string) {
    const response = await this.client.get('/content', {
      params: { page, limit, topic, format },
    });
    return response.data;
  }

  async updateContent(id: string, data: Partial<IContent>) {
    const response = await this.client.put(`/content/${id}`, data);
    return response.data;
  }

  async deleteContent(id: string) {
    const response = await this.client.delete(`/content/${id}`);
    return response.data;
  }

  // Analytics endpoints
  async recordAnalytics(data: Omit<IAnalytics, 'id' | 'createdAt'>) {
    const response = await this.client.post('/analytics', data);
    return response.data;
  }

  async getAnalyticsSummary(startDate?: Date, endDate?: Date) {
    const response = await this.client.get('/analytics/summary', {
      params: { startDate, endDate },
    });
    return response.data;
  }

  async getTopicPerformance(limit: number = 10) {
    const response = await this.client.get('/analytics/topics', {
      params: { limit },
    });
    return response.data;
  }

  async getFormatPerformance(limit: number = 10) {
    const response = await this.client.get('/analytics/formats', {
      params: { limit },
    });
    return response.data;
  }

  async syncChannels() {
    const response = await this.client.post('/analytics/sync');
    return response.data;
  }

  // AI endpoints
  async getPredictions(title: string, format: string, topic: string, length: number) {
    const response = await this.client.post('/analysis/predictions', {
      title,
      format,
      topic,
      length,
    });
    return response.data;
  }

  async getInsights() {
    const response = await this.client.get('/analysis/insights');
    return response.data;
  }

  async getContentGaps() {
    const response = await this.client.get('/analysis/gaps');
    return response.data;
  }

  async getHighConvertingTopics(limit: number = 5) {
    const response = await this.client.get('/analysis/topics', {
      params: { limit },
    });
    return response.data;
  }

  async getEmergingTrends() {
    const response = await this.client.get('/analysis/trends');
    return response.data;
  }

  // Report endpoints
  async generateReport() {
    const response = await this.client.post('/reports');
    return response.data;
  }

  async getLatestReport() {
    const response = await this.client.get('/reports/latest');
    return response.data;
  }

  async getReport(id: string) {
    const response = await this.client.get(`/reports/${id}`);
    return response.data;
  }

  async listReports(page: number = 1, limit: number = 10) {
    const response = await this.client.get('/reports', {
      params: { page, limit },
    });
    return response.data;
  }

  // Health check
  async health() {
    const response = await this.client.get('/health');
    return response.data;
  }
}

export default new APIClient();
