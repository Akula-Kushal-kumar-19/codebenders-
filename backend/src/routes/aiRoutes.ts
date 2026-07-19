import { Router } from 'express';
import AIController from '../controllers/AIController';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

// AI endpoints
router.post('/predictions', asyncHandler(AIController.getPredictions.bind(AIController)));
router.get('/insights', asyncHandler(AIController.getInsights.bind(AIController)));
router.get('/gaps', asyncHandler(AIController.getContentGaps.bind(AIController)));
router.get('/topics', asyncHandler(AIController.getHighConvertingTopics.bind(AIController)));
router.get('/trends', asyncHandler(AIController.getEmergingTrends.bind(AIController)));

export default router;
