import { Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// Analytics endpoints
router.post('/', asyncHandler((req, res) => AnalyticsController.recordAnalytics(req, res)));
router.get('/summary', asyncHandler((req, res) => AnalyticsController.getSummary(req, res)));
router.get('/topics', asyncHandler((req, res) => AnalyticsController.getTopicPerformance(req, res)));
router.get('/formats', asyncHandler((req, res) => AnalyticsController.getFormatPerformance(req, res)));
router.post('/sync', asyncHandler((req, res) => AnalyticsController.syncChannels(req, res)));

export default router;
