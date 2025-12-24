import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Toutes les routes nécessitent une authentification
router.use(authenticate);

// Routes CRUD pour les étudiants
router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.get('/class/:classId', studentController.getStudentsByClassId);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;