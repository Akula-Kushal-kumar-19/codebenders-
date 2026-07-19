import { Router } from 'express';
import ContentController from '../controllers/ContentController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// Content endpoints
router.post('/', asyncHandler((req, res) => ContentController.create(req, res)));
router.get('/', asyncHandler((req, res) => ContentController.list(req, res)));
router.get('/:id', asyncHandler((req, res) => ContentController.getById(req, res)));
router.get('/:id/performance', asyncHandler((req, res) => ContentController.getPerformance(req, res)));
router.put('/:id', asyncHandler((req, res) => ContentController.update(req, res)));
router.delete('/:id', asyncHandler((req, res) => ContentController.delete(req, res)));

export default router;
