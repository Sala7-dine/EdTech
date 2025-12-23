import prisma from '../config/database';
import { Class } from '@prisma/client';

export const classModel = {
  async create(name: string): Promise<Class> {
    return prisma.class.create({
      data: { name }
    });
  },

  async findAll(): Promise<Class[]> {
    return prisma.class.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async findById(id: number): Promise<Class | null> {
    return prisma.class.findUnique({
      where: { id }
    });
  },

  async findByIdWithStudents(id: number) {
    return prisma.class.findUnique({
      where: { id },
      include: {
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          },
          orderBy: { lastName: 'asc' }
        }
      }
    });
  },

  async update(id: number, name: string): Promise<Class> {
    return prisma.class.update({
      where: { id },
      data: { name }
    });
  },

  async delete(id: number): Promise<Class> {
    return prisma.class.delete({
      where: { id }
    });
  }
};
