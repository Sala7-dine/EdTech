import prisma from '../config/database';
import { Session } from '@prisma/client';
import { CreateSessionDto, UpdateSessionDto } from '../types/session.types';

export const sessionModel = {
  async create(data: CreateSessionDto): Promise<Session> {
    return prisma.session.create({
      data: {
        date: new Date(data.date),
        classId: data.classId,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
      },
    });
  },

  async findAll(): Promise<Session[]> {
    return prisma.session.findMany({
      orderBy: { date: 'desc' },
    });
  },

  async findAllWithRelations() {
    return prisma.session.findMany({
      include: {
        class: true,
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  },

  async findById(id: number): Promise<Session | null> {
    return prisma.session.findUnique({
      where: { id },
    });
  },

  async findByIdWithRelations(id: number) {
    return prisma.session.findUnique({
      where: { id },
      include: {
        class: true,
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },

  async findByClassId(classId: number): Promise<Session[]> {
    return prisma.session.findMany({
      where: { classId },
      orderBy: { date: 'desc' },
    });
  },

  async findByClassIdWithRelations(classId: number) {
    return prisma.session.findMany({
      where: { classId },
      include: {
        class: true,
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  },

  async findByTeacherId(teacherId: number): Promise<Session[]> {
    return prisma.session.findMany({
      where: { teacherId },
      orderBy: { date: 'desc' },
    });
  },

  async findByTeacherIdWithRelations(teacherId: number) {
    return prisma.session.findMany({
      where: { teacherId },
      include: {
        class: true,
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  },

  async update(id: number, data: UpdateSessionDto): Promise<Session> {
    const updateData: any = {};

    if (data.date !== undefined) {
      updateData.date = new Date(data.date);
    }
    if (data.classId !== undefined) {
      updateData.classId = data.classId;
    }
    if (data.subjectId !== undefined) {
      updateData.subjectId = data.subjectId;
    }
    if (data.teacherId !== undefined) {
      updateData.teacherId = data.teacherId;
    }

    return prisma.session.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: number): Promise<Session> {
    return prisma.session.delete({
      where: { id },
    });
  },
};