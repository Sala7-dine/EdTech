import { Request, Response, NextFunction } from 'express';
import { subjectService } from '../services/subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from '../types/subject.types';

export const subjectController = {
  async createSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateSubjectDto = req.body;
      const result = await subjectService.createSubject(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllSubjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const subjects = await subjectService.getAllSubjects();
      res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  },

  async getSubjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const subject = await subjectService.getSubjectById(id);
      res.status(200).json(subject);
    } catch (error) {
      next(error);
    }
  },

  async updateSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const data: UpdateSubjectDto = req.body;
      const result = await subjectService.updateSubject(id, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteSubject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await subjectService.deleteSubject(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};