// interfaces/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'hiring_manager' | 'coordinator';
  slackId?: string;
}

