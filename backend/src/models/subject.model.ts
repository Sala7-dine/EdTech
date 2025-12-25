import prisma from '../config/database';
import { Subject } from '@prisma/client';

export const subjectModel = {
  async create(name: string): Promise<Subject> {
    return prisma.subject.create({
      data: { name }
    });
  },

  async findAll(): Promise<Subject[]> {
    return prisma.subject.findMany({
      orderBy: { name: 'asc' }
    });
  },

  async findById(id: number): Promise<Subject | null> {
    return prisma.subject.findUnique({
      where: { id }
    });
  },

  async update(id: number, name: string): Promise<Subject> {
    return prisma.subject.update({
      where: { id },
      data: { name }
    });
  },

  async delete(id: number): Promise<Subject> {
    return prisma.subject.delete({
      where: { id }
    });
  }
};