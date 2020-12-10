import { Router } from 'express';
import UserRouter from './Users';
import GameRouter from './Game';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/game', GameRouter);

// Export the base-router
export default router;
