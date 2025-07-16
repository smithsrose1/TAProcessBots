export interface Feedback {
  id: string;
  interviewId: string;
  panelMemberId: string;
  candidateId: string;
  submittedAt: string | null;  // ISO string or null if not submitted
  comments: string;
  rating?: number;  // optional numeric rating
}

export interface Feedback {
  id: string;
  candidateId: string;
  fromUserId: string;
  message: string;
  submittedAt: string;
}