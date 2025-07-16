export interface Interview {
  id: string;
  candidateId: string;
  stage: string; // 'technical', 'final', etc.
  scheduledAt: string | null; // ISO 8601 format or null
  durationMinutes: number;
  panelMemberIds: string[];
  status: 'pending' | 'scheduled' | 'completed' | 'canceled';

  // Outlook-specific
  outlookEventId?: string; // ID of the Outlook calendar event
  meetingLink?: string;    // Teams/Zoom/Google Meet link
  createdAt: string;
  updatedAt: string;
}

export interface PanelMember {
  id: string;
  name: string;
  email: string;
  role: string;

  // Outlook-specific
  outlookUserId?: string;
  availabilityWindows?: AvailabilityWindow[]; // Pulled from Outlook
}

export interface AvailabilityWindow {
  start: string; // ISO date string
  end: string;
  isBusy: boolean;
}

//When integrating with Outlook:

// You'll fetch availability using Microsoft Graph API.

// You'll create/update events for interviews, which return an eventId and meeting link.

// Having these properties in the model ensures traceability and easy UI display.