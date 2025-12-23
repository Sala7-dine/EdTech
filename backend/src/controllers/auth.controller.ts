import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../types/auth.types';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: RegisterDto = req.body;
      const result = await authService.register(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginDto = req.body;
      const result = await authService.login(data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.logout();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
