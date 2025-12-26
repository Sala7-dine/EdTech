import { PresenceStatus } from '../enums/presence-status.enum';

export interface CreatePresenceDto {
  status: PresenceStatus;
  studentId: number;
  sessionId: number;
}

export interface UpdatePresenceDto {
  status: PresenceStatus;
}

export interface PresenceResponse {
  id: number;
  status: PresenceStatus;
  studentId: number;
  sessionId: number;
}

export interface PresenceWithStudentResponse {
  id: number;
  status: PresenceStatus;
  studentId: number;
  sessionId: number;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface PresenceWithRelationsResponse {
  id: number;
  status: PresenceStatus;
  student: {
    id: number;
    firstName: string;
    lastName: string;
    classId: number;
  };
  session: {
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
  };
}

// Type pour les statistiques de présence
export interface PresenceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  presenceRate: number; // Pourcentage de présents
}

// Type pour le rapport de présence par étudiant
export interface StudentPresenceReport {
  studentId: number;
  studentName: string;
  stats: PresenceStats;
}

// Type pour le rapport de présence par session
export interface SessionPresenceReport {
  sessionId: number;
  date: Date;
  className: string;
  subjectName: string;
  stats: PresenceStats;
  presences: PresenceWithStudentResponse[];
}