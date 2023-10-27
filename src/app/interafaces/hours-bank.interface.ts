export interface HoursBank {
  banked_hour_id: string;
  company_id: string;
  user_id: string;
  record_id: string;
  worked_date: string;
  worked_hours: TimeObject;
  intervals: TimeObject;
  expected_hours: TimeObject;
  banked_hours: string;
  created_at: string;
}

export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}
