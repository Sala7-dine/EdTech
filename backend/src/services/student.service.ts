import { studentModel } from '../models/student.model';
import { classModel } from '../models/class.model';
import { CreateStudentDto, UpdateStudentDto, StudentResponse, StudentWithClassResponse } from '../types/student.types';

export const studentService = {
  async createStudent(data: CreateStudentDto): Promise<StudentResponse> {
    // Vérifier que la classe existe
    const classExists = await classModel.findById(data.classId);
    if (!classExists) {
      throw new Error('Classe non trouvée');
    }

    const student = await studentModel.create(data.firstName, data.lastName, data.classId);
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      classId: student.classId
    };
  },

  async getAllStudents(): Promise<StudentResponse[]> {
    const students = await studentModel.findAll();
    return students.map(s => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      classId: s.classId
    }));
  },

  async getStudentById(id: number): Promise<StudentWithClassResponse> {
    const student = await studentModel.findByIdWithClass(id);
    if (!student) {
      throw new Error('Étudiant non trouvé');
    }
    return {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      class: student.class
    };
  },

  async getStudentsByClassId(classId: number): Promise<StudentResponse[]> {
    // Vérifier que la classe existe
    const classExists = await classModel.findById(classId);
    if (!classExists) {
      throw new Error('Classe non trouvée');
    }

    const students = await studentModel.findByClassId(classId);
    return students.map(s => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      classId: s.classId
    }));
  },

  async updateStudent(id: number, data: UpdateStudentDto): Promise<StudentResponse> {
    const existingStudent = await studentModel.findById(id);
    if (!existingStudent) {
      throw new Error('Étudiant non trouvé');
    }

    // Si on change de classe, vérifier qu'elle existe
    if (data.classId && data.classId !== existingStudent.classId) {
      const classExists = await classModel.findById(data.classId);
      if (!classExists) {
        throw new Error('Classe non trouvée');
      }
    }

    const updatedStudent = await studentModel.update(id, data);
    return {
      id: updatedStudent.id,
      firstName: updatedStudent.firstName,
      lastName: updatedStudent.lastName,
      classId: updatedStudent.classId
    };
  },

  async deleteStudent(id: number): Promise<{ message: string }> {
    const existingStudent = await studentModel.findById(id);
    if (!existingStudent) {
      throw new Error('Étudiant non trouvé');
    }

    await studentModel.delete(id);
    return { message: 'Étudiant supprimé avec succès' };
  }
};