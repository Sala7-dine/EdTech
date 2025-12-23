import { classModel } from '../models/class.model';
import { CreateClassDto, UpdateClassDto, ClassResponse, ClassWithStudentsResponse } from '../types/class.types';

export const classService = {
  async createClass(data: CreateClassDto): Promise<ClassResponse> {
    const classEntity = await classModel.create(data.name);
    return {
      id: classEntity.id,
      name: classEntity.name
    };
  },

  async getAllClasses(): Promise<ClassResponse[]> {
    const classes = await classModel.findAll();
    return classes.map(c => ({
      id: c.id,
      name: c.name
    }));
  },

  async getClassById(id: number): Promise<ClassResponse> {
    const classEntity = await classModel.findById(id);
    if (!classEntity) {
      throw new Error('Classe non trouvée');
    }
    return {
      id: classEntity.id,
      name: classEntity.name
    };
  },

  async getClassWithStudents(id: number): Promise<ClassWithStudentsResponse> {
    const classEntity = await classModel.findByIdWithStudents(id);
    if (!classEntity) {
      throw new Error('Classe non trouvée');
    }
    return {
      id: classEntity.id,
      name: classEntity.name,
      students: classEntity.students
    };
  },

  async updateClass(id: number, data: UpdateClassDto): Promise<ClassResponse> {
    const existingClass = await classModel.findById(id);
    if (!existingClass) {
      throw new Error('Classe non trouvée');
    }

    if (!data.name) {
      throw new Error('Le nom de la classe est requis');
    }

    const updatedClass = await classModel.update(id, data.name);
    return {
      id: updatedClass.id,
      name: updatedClass.name
    };
  },

  async deleteClass(id: number): Promise<{ message: string }> {
    const existingClass = await classModel.findById(id);
    if (!existingClass) {
      throw new Error('Classe non trouvée');
    }

    await classModel.delete(id);
    return { message: 'Classe supprimée avec succès' };
  }
};
