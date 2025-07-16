import {Feedback} from './Feedback';

export type CandidateStage =
  | 'Application Review'
  | 'Phone'
  | 'Technical'
  | 'Final'
  | 'Offer';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;

  // Tied to the JD they applied for
  jobId: string;

  // Assigned hiring manager
  hiringManagerId: string;
  recruiter: string;


  // Pipeline fields
  currentStage: CandidateStage;        // default: 'Application Review'
  stageEnteredAt: string;              // ISO timestamp when entered this stage
  pipelineStartedAt: string;           // Timestamp when candidate was added to pipeline

  // Feedback
  feedback: Feedback[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  status?: string;

}
