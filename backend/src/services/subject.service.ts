import { subjectModel } from '../models/subject.model';
import { CreateSubjectDto, UpdateSubjectDto, SubjectResponse } from '../types/subject.types';

export const subjectService = {
  async createSubject(data: CreateSubjectDto): Promise<SubjectResponse> {
    const subject = await subjectModel.create(data.name);
    return {
      id: subject.id,
      name: subject.name
    };
  },

  async getAllSubjects(): Promise<SubjectResponse[]> {
    const subjects = await subjectModel.findAll();
    return subjects.map(s => ({
      id: s.id,
      name: s.name
    }));
  },

  async getSubjectById(id: number): Promise<SubjectResponse> {
    const subject = await subjectModel.findById(id);
    if (!subject) {
      throw new Error('Matière non trouvée');
    }
    return {
      id: subject.id,
      name: subject.name
    };
  },

  async updateSubject(id: number, data: UpdateSubjectDto): Promise<SubjectResponse> {
    const existingSubject = await subjectModel.findById(id);
    if (!existingSubject) {
      throw new Error('Matière non trouvée');
    }

    if (!data.name) {
      throw new Error('Le nom de la matière est requis');
    }

    const updatedSubject = await subjectModel.update(id, data.name);
    return {
      id: updatedSubject.id,
      name: updatedSubject.name
    };
  },

  async deleteSubject(id: number): Promise<{ message: string }> {
    const existingSubject = await subjectModel.findById(id);
    if (!existingSubject) {
      throw new Error('Matière non trouvée');
    }

    await subjectModel.delete(id);
    return { message: 'Matière supprimée avec succès' };
  }
};