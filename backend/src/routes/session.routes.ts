import { Router } from 'express';
import { sessionController } from '../controllers/session.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// All routes require authentication
router.post('/', authenticate, sessionController.createSession);
router.get('/', authenticate, sessionController.getAllSessions);
router.get('/:id', authenticate, sessionController.getSessionById);
router.get('/class/:classId', authenticate, sessionController.getSessionsByClassId);
router.get('/teacher/:teacherId', authenticate, sessionController.getSessionsByTeacherId);
router.put('/:id', authenticate, sessionController.updateSession);
router.delete('/:id', authenticate, sessionController.deleteSession);

export default router;