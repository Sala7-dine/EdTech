import { Router } from 'express';
import { classController } from '../controllers/class.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

// Routes CRUD pour les classes
router.post('/', classController.createClass);
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.get('/:id/students', classController.getClassWithStudents);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

export default router;
