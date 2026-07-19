import { Router } from 'express';
import AIController from '../controllers/AIController';

const router = Router();

// AI endpoints
router.post('/predictions', AIController.getPredictions);
router.get('/insights', AIController.getInsights);
router.get('/gaps', AIController.getContentGaps);
router.get('/topics', AIController.getHighConvertingTopics);
router.get('/trends', AIController.getEmergingTrends);

export default router;
