import prisma from '../config/database';
import { Student } from '@prisma/client';

export const studentModel = {
  async create(firstName: string, lastName: string, classId: number): Promise<Student> {
    return prisma.student.create({
      data: { firstName, lastName, classId }
    });
  },

  async findAll(): Promise<Student[]> {
    return prisma.student.findMany({
      orderBy: { lastName: 'asc' }
    });
  },

  async findById(id: number): Promise<Student | null> {
    return prisma.student.findUnique({
      where: { id }
    });
  },

  async findByIdWithClass(id: number) {
    return prisma.student.findUnique({
      where: { id },
      include: {
        class: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  },

  async findByClassId(classId: number): Promise<Student[]> {
    return prisma.student.findMany({
      where: { classId },
      orderBy: { lastName: 'asc' }
    });
  },

  async update(id: number, data: { firstName?: string; lastName?: string; classId?: number }): Promise<Student> {
    return prisma.student.update({
      where: { id },
      data
    });
  },

  async delete(id: number): Promise<Student> {
    return prisma.student.delete({
      where: { id }
    });
  }
};