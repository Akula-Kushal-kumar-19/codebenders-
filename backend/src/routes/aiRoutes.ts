import { Router } from 'express';
import AIController from '../controllers/AIController';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

// AI endpoints
router.post('/predictions', asyncHandler((req, res) => AIController.getPredictions(req, res)));
router.get('/insights', asyncHandler((req, res) => AIController.getInsights(req, res)));
router.get('/gaps', asyncHandler((req, res) => AIController.getContentGaps(req, res)));
router.get('/topics', asyncHandler((req, res) => AIController.getHighConvertingTopics(req, res)));
router.get('/trends', asyncHandler((req, res) => AIController.getEmergingTrends(req, res)));

export default router;
