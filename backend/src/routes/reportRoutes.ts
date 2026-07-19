import { Router } from 'express';
import ReportController from '../controllers/ReportController';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

// Report endpoints
router.post('/', asyncHandler(ReportController.generateReport.bind(ReportController)));
router.get('/latest', asyncHandler(ReportController.getLatest.bind(ReportController)));
router.get('/', asyncHandler(ReportController.list.bind(ReportController)));
router.get('/:id', asyncHandler(ReportController.getById.bind(ReportController)));

export default router;
