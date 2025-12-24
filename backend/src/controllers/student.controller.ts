import { Request, Response, NextFunction } from 'express';
import { studentService } from '../services/student.service';
import { CreateStudentDto, UpdateStudentDto } from '../types/student.types';

export const studentController = {
  async createStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateStudentDto = req.body;
      const result = await studentService.createStudent(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  },

  async getStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const student = await studentService.getStudentById(id);
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  },

  async getStudentsByClassId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classId = parseInt(req.params.classId as string);
      const students = await studentService.getStudentsByClassId(classId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  },

  async updateStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const data: UpdateStudentDto = req.body;
      const result = await studentService.updateStudent(id, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async deleteStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await studentService.deleteStudent(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};