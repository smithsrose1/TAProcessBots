// interfaces/Notification.ts
export interface Notification {
  id: string;
  recipientId: string;
  message: string;
  type: 'email' | 'slack' | 'in-app';
  sentAt: number;
  read: boolean;
  relatedTo: {
    type: 'job' | 'candidate' | 'interview';
    id: string;
  };
}
