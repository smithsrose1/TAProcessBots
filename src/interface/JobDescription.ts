  export interface JobDescription {
  id: string;                         // e.g., 'REQ-001'
  title: string;                      // e.g., 'Senior React Developer'
  department: string;                 // e.g., 'Engineering'
  hiringManager: string;             // e.g., 'Sarah Johnson' (name instead of user ID)
  // for now we'll keep the name, later on we'll change it to take the ID (same for recruiter)
  // hiringManagerId: string;        // e.g., 'user-123' (ID of the hiring manager)
  recruiter: string;                 // e.g., 'John Smith' (name instead of user ID)
  
  status: 'Draft' | 'Published' | 'Idle' | 'Active'; // updated casing for readability

  slaStatus: 'On Track' | 'At Risk' | 'Breached'; // new field to track SLA
  daysOpen: number;                  // e.g., 12
  candidates: number;               // e.g., 8 (number of candidates linked)
  priority: 'Low' | 'Medium' | 'High'; // new field to show urgency or importance

  attachmentUrl?: string;            // optional file link
  attachmentName?: string;           // optional original file name

  createdAt: number;                 // timestamp (can still be useful)
}