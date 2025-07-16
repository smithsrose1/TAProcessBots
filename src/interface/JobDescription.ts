// interfaces/JobDescription.ts
export interface JobDescription {
  id: string;
  title: string;
  createdAt: number;
  createdBy: string; // hiring manager user ID
  assignedTo?: string; // recruiter user ID
  status: 'draft' | 'published' | 'idle' | 'active';

  
  attachmentUrl?: string; // 👈 optional file link
  attachmentName?: string; // optional, original file name
}