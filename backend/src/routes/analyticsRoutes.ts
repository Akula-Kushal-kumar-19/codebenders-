import { Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController';

const router = Router();

// Analytics endpoints
router.post('/', AnalyticsController.recordAnalytics);
router.get('/summary', AnalyticsController.getSummary);
router.get('/topics', AnalyticsController.getTopicPerformance);
router.get('/formats', AnalyticsController.getFormatPerformance);
router.post('/sync', AnalyticsController.syncChannels);

export default router;
