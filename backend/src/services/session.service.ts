import { sessionModel } from '../models/session.model';
import { CreateSessionDto, UpdateSessionDto } from '../types/session.types';
import { classModel } from '../models/class.model';
import { subjectModel } from '../models/subject.model';
import prisma from '../config/database';

export const sessionService = {
  async createSession(data: CreateSessionDto) {
    // Validate required fields
    if (!data.date) {
      throw new Error('La date est requise');
    }
    if (!data.classId) {
      throw new Error('La classe est requise');
    }
    if (!data.subjectId) {
      throw new Error('La matière est requise');
    }
    if (!data.teacherId) {
      throw new Error('Le professeur est requis');
    }

    // Validate date format
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      throw new Error('Format de date invalide');
    }

    // Validate class exists
    const classExists = await classModel.findById(data.classId);
    if (!classExists) {
      throw new Error('La classe spécifiée n\'existe pas');
    }

    // Validate subject exists
    const subjectExists = await subjectModel.findById(data.subjectId);
    if (!subjectExists) {
      throw new Error('La matière spécifiée n\'existe pas');
    }

    // Validate teacher exists and has correct role
    const teacher = await prisma.user.findUnique({
      where: { id: data.teacherId },
    });
    if (!teacher) {
      throw new Error('Le professeur spécifié n\'existe pas');
    }
    if (teacher.role !== 'TEACHER' && teacher.role !== 'ADMIN') {
      throw new Error('L\'utilisateur spécifié n\'est pas un professeur');
    }

    return sessionModel.create(data);
  },

  async getAllSessions(includeRelations: boolean = false) {
    if (includeRelations) {
      return sessionModel.findAllWithRelations();
    }
    return sessionModel.findAll();
  },

  async getSessionById(id: number, includeRelations: boolean = false) {
    let session;
    if (includeRelations) {
      session = await sessionModel.findByIdWithRelations(id);
    } else {
      session = await sessionModel.findById(id);
    }

    if (!session) {
      throw new Error('Séance non trouvée');
    }
    return session;
  },

  async getSessionsByClassId(classId: number, includeRelations: boolean = false) {
    // Validate class exists
    const classExists = await classModel.findById(classId);
    if (!classExists) {
      throw new Error('La classe spécifiée n\'existe pas');
    }

    if (includeRelations) {
      return sessionModel.findByClassIdWithRelations(classId);
    }
    return sessionModel.findByClassId(classId);
  },

  async getSessionsByTeacherId(teacherId: number, includeRelations: boolean = false) {
    // Validate teacher exists
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new Error('Le professeur spécifié n\'existe pas');
    }

    if (includeRelations) {
      return sessionModel.findByTeacherIdWithRelations(teacherId);
    }
    return sessionModel.findByTeacherId(teacherId);
  },

  async updateSession(id: number, data: UpdateSessionDto) {
    // Check if session exists
    const session = await sessionModel.findById(id);
    if (!session) {
      throw new Error('Séance non trouvée');
    }

    // Validate date if provided
    if (data.date !== undefined) {
      const date = new Date(data.date);
      if (isNaN(date.getTime())) {
        throw new Error('Format de date invalide');
      }
    }

    // Validate class if provided
    if (data.classId !== undefined) {
      const classExists = await classModel.findById(data.classId);
      if (!classExists) {
        throw new Error('La classe spécifiée n\'existe pas');
      }
    }

    // Validate subject if provided
    if (data.subjectId !== undefined) {
      const subjectExists = await subjectModel.findById(data.subjectId);
      if (!subjectExists) {
        throw new Error('La matière spécifiée n\'existe pas');
      }
    }

    // Validate teacher if provided
    if (data.teacherId !== undefined) {
      const teacher = await prisma.user.findUnique({
        where: { id: data.teacherId },
      });
      if (!teacher) {
        throw new Error('Le professeur spécifié n\'existe pas');
      }
      if (teacher.role !== 'TEACHER' && teacher.role !== 'ADMIN') {
        throw new Error('L\'utilisateur spécifié n\'est pas un professeur');
      }
    }

    return sessionModel.update(id, data);
  },

  async deleteSession(id: number) {
    const session = await sessionModel.findById(id);
    if (!session) {
      throw new Error('Séance non trouvée');
    }
    return sessionModel.delete(id);
  },
};