export interface CreateSubjectDto {
  name: string;
}

export interface UpdateSubjectDto {
  name?: string;
}

export interface SubjectResponse {
  id: number;
  name: string;
}
