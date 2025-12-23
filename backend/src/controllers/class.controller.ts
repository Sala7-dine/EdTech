import { Request, Response, NextFunction } from 'express';
import { classService } from '../services/class.service';
import { CreateClassDto, UpdateClassDto } from '../types/class.types';

export const classController = {
  async createClass(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateClassDto = req.body;
      const result = await classService.createClass(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllClasses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classes = await classService.getAllClasses();
      res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  },

  async getClassById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const classEntity = await classService.getClassById(id);
      res.status(200).json(classEntity);
    } catch (error) {
      next(error);
    }
  },

  async getClassWithStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const classEntity = await classService.getClassWithStudents(id);
      res.status(200).json(classEntity);
    } catch (error) {
      next(error);
    }
  },

  async updateClass(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const data: UpdateClassDto = req.body;
      const result = await classService.updateClass(id, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteClass(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await classService.deleteClass(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};
