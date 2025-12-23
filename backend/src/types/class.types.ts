export interface CreateClassDto {
  name: string;
}

export interface UpdateClassDto {
  name?: string;
}

export interface ClassResponse {
  id: number;
  name: string;
}

export interface ClassWithStudentsResponse {
  id: number;
  name: string;
  students: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
}
