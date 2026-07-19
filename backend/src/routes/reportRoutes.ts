import { Router } from 'express';
import ReportController from '../controllers/ReportController';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

// Report endpoints
router.post('/', asyncHandler((req, res) => ReportController.generateReport(req, res)));
router.get('/latest', asyncHandler((req, res) => ReportController.getLatest(req, res)));
router.get('/', asyncHandler((req, res) => ReportController.list(req, res)));
router.get('/:id', asyncHandler((req, res) => ReportController.getById(req, res)));

export default router;
