// interfaces/TimerEvent.ts
export type AlertType =
  | 'jd-idle'
  | 'no-profiles'
  | 'interview-delay'
  | 'stage-stuck';

export interface TimerEvent {
  id: string;
  targetType: 'job' | 'candidate' | 'interview';
  targetId: string;
  startTime: number;
  timeoutDuration: number;
  triggered: boolean;
  alertType: AlertType;
}