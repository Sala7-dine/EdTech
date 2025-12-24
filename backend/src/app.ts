import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import classRoutes from './routes/class.routes';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Middleware de gestion d'erreurs (doit être le dernier)
app.use(errorHandler);

export default app;
