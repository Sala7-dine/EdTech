export interface CreateSessionDto {
  date: string; // ISO 8601 date string
  classId: number;
  subjectId: number;
  teacherId: number;
}

export interface UpdateSessionDto {
  date?: string;
  classId?: number;
  subjectId?: number;
  teacherId?: number;
}

export interface SessionResponse {
  id: number;
  date: Date;
  classId: number;
  subjectId: number;
  teacherId: number;
}

export interface SessionWithRelationsResponse {
  id: number;
  date: Date;
  class: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
  };
  teacher: {
    id: number;
    email: string;
    role: string;
  };
}
