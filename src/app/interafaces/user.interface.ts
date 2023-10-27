import { Adress } from './adress.interface';
import { Email } from './email.interface';
import { Phone } from './phone.interface';
import { Record } from './record.interface';

export interface User {
  user_id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  register_number: string;
  role: string;
  created_at?: string;
  adresses?: Adress[];
  phones?: Phone[];
  emails?: Email[];
  records: Record;
  status?: boolean | null;

  arrivedAt?: string;
  leftAt?: string;
  extraHours?: string;
  missingHours: () => string;
  totalHours: () => string;
}
