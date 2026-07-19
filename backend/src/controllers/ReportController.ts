import { Request, Response } from 'express';
import ReportGenerationService from '../services/ReportGenerationService';
import logger from '../utils/logger';

export class ReportController {
  /**
   * Generate report
   */
  async generateReport(req: Request, res: Response) {
    try {
      logger.info('Starting report generation...');
      const report = await ReportGenerationService.generateBiWeeklyReport();

      res.status(201).json({ success: true, data: report });
    } catch (error) {
      logger.error('Error generating report:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get latest report
   */
  async getLatest(req: Request, res: Response) {
    try {
      const report = await ReportGenerationService.getLatestReport();

      if (!report) {
        return res.status(404).json({ success: false, error: 'No reports found' });
      }

      res.json({ success: true, data: report });
    } catch (error) {
      logger.error('Error fetching latest report:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * Get report by ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await ReportGenerationService.getReportById(id);

      if (!report) {
        return res.status(404).json({ success: false, error: 'Report not found' });
      }

      res.json({ success: true, data: report });
    } catch (error) {
      logger.error('Error fetching report:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  /**
   * List reports
   */
  async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const result = await ReportGenerationService.getAllReports(Number(limit), skip);

      res.json({
        success: true,
        data: result.reports,
        pagination: result.pagination,
      });
    } catch (error) {
      logger.error('Error listing reports:', { error });
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export default new ReportController();
