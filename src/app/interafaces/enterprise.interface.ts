import { User } from './user.interface';
import { Adress } from './adress.interface';
import { Email } from './email.interface';
import { Phone } from './phone.interface';

export interface Enterprise {
  companyId: string;
  name: string;
  alias: string;
  registerNumber: string;
  website: string;
  createdAt: string;
  adresses: Adress[];
  phones: Phone[];
  emails: Email[];
  employes: User[];
}
