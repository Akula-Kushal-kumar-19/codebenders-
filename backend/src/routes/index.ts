import { Router } from 'express';
import contentRoutes from './contentRoutes';
import analyticsRoutes from './analyticsRoutes';
import aiRoutes from './aiRoutes';
import reportRoutes from './reportRoutes';

const router = Router();

// Mount routes
router.use('/content', contentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/analysis', aiRoutes);
router.use('/reports', reportRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

export default router;
