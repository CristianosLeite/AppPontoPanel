import { Adress } from './adress.interface';
import { Email } from './email.interface';
import { Phone } from './phone.interface';
import { Record } from './record.interface';

export interface User {
  userId: string;
  companyId: string;
  firstName: string;
  lastName: string;
  registerNumber: string;
  createdAt: string;
  role: string;
  adresses: Adress[];
  phones: Phone[];
  emails: Email[];
  records: Record[];
  token: string;
  status: boolean;
  dayRecord: Record;
}
