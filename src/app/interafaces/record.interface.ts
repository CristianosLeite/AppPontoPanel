import { HoursBank, TimeObject } from "./hours-bank.interface";

export interface Record {
  record_id: string;
  company_id: string;
  user_id: string;
  record_date: string;
  record_time: TimeObject;
  worked_location?: string;
  record_photo?: string;
  record_status?: string;
  created_at?: string;
  hours_bank: HoursBank[];
  intervals?: [{key: string, value: string }];
}
