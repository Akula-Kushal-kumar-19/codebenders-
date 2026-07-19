import { Router } from 'express';
import ReportController from '../controllers/ReportController';

const router = Router();

// Report endpoints
router.post('/', ReportController.generateReport);
router.get('/latest', ReportController.getLatest);
router.get('/', ReportController.list);
router.get('/:id', ReportController.getById);

export default router;
