import { Router } from 'express';
import ContentController from '../controllers/ContentController';

const router = Router();

// Content endpoints
router.post('/', ContentController.create);
router.get('/', ContentController.list);
router.get('/:id', ContentController.getById);
router.get('/:id/performance', ContentController.getPerformance);
router.put('/:id', ContentController.update);
router.delete('/:id', ContentController.delete);

export default router;
