export interface Recruiter {
  id: string;
  name: string;
  email: string;
  department?: string;
  activeRequisitions?: number;
  createdAt: number;
  updatedAt: number;
}