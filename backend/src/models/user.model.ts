import { Role, User as PrismaUser } from '@prisma/client';
import prisma from '../config/database';

export type User = PrismaUser;

export const userModel = {
  async create(data: { email: string; password: string; role: Role }): Promise<User> {
    return await prisma.user.create({ data });
  },

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  },

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  },

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  },
};
