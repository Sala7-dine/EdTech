export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  classId: number;
}

export interface UpdateStudentDto {
  firstName?: string;
  lastName?: string;
  classId?: number;
}

export interface StudentResponse {
  id: number;
  firstName: string;
  lastName: string;
  classId: number;
}

export interface StudentWithClassResponse {
  id: number;
  firstName: string;
  lastName: string;
  class: {
    id: number;
    name: string;
  };
}
