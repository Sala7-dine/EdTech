import { Request, Response } from 'express';
import { sessionService } from '../services/session.service';
import { CreateSessionDto, UpdateSessionDto } from '../types/session.types';

export const sessionController = {
  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateSessionDto = req.body;
      const session = await sessionService.createSession(data);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  async getAllSessions(req: Request, res: Response): Promise<void> {
    try {
      const includeRelations = req.query.includeRelations === 'true';
      const sessions = await sessionService.getAllSessions(includeRelations);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des séances' });
    }
  },

  async getSessionById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const includeRelations = req.query.includeRelations === 'true';
      const session = await sessionService.getSessionById(id, includeRelations);
      res.json(session);
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'Séance non trouvée') {
        res.status(404).json({ error: message });
      } else {
        res.status(500).json({ error: 'Erreur lors de la récupération de la séance' });
      }
    }
  },

  async getSessionsByClassId(req: Request, res: Response): Promise<void> {
    try {
      const classId = parseInt(req.params.classId as string);
      const includeRelations = req.query.includeRelations === 'true';
      const sessions = await sessionService.getSessionsByClassId(classId, includeRelations);
      res.json(sessions);
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'La classe spécifiée n\'existe pas') {
        res.status(404).json({ error: message });
      } else {
        res.status(500).json({ error: 'Erreur lors de la récupération des séances' });
      }
    }
  },

  async getSessionsByTeacherId(req: Request, res: Response): Promise<void> {
    try {
      const teacherId = parseInt(req.params.teacherId as string);
      const includeRelations = req.query.includeRelations === 'true';
      const sessions = await sessionService.getSessionsByTeacherId(teacherId, includeRelations);
      res.json(sessions);
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'Le professeur spécifié n\'existe pas') {
        res.status(404).json({ error: message });
      } else {
        res.status(500).json({ error: 'Erreur lors de la récupération des séances' });
      }
    }
  },

  async updateSession(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const data: UpdateSessionDto = req.body;
      const session = await sessionService.updateSession(id, data);
      res.json(session);
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'Séance non trouvée') {
        res.status(404).json({ error: message });
      } else if (
        message.includes('existe pas') ||
        message.includes('invalide') ||
        message.includes('requis') ||
        message.includes('professeur')
      ) {
        res.status(400).json({ error: message });
      } else {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la séance' });
      }
    }
  },

  async deleteSession(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      await sessionService.deleteSession(id);
      res.json({ message: 'Séance supprimée avec succès' });
    } catch (error) {
      const message = (error as Error).message;
      if (message === 'Séance non trouvée') {
        res.status(404).json({ error: message });
      } else {
        res.status(500).json({ error: 'Erreur lors de la suppression de la séance' });
      }
    }
  },
};