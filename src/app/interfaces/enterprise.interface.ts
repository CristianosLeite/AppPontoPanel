import { User } from './user.interface';
import { Adress } from './adress.interface';
import { Email } from './email.interface';
import { Phone } from './phone.interface';

/**
 * @description Interface de empresa
 * @param company_id Identificador único da empresa
 * @param cod_company Código da empresa
 * @param name Nome da empresa
 * @param alias Nome fantasia da empresa
 * @param register_number Número do CNPJ da empresa
 * @param website Website da empresa
 * @param createdAt Data de criação da empresa
 * @param adresses Endereços da empresa
 * @param phones Telefones da empresa
 * @param emails Emails da empresa
 * @param employes Funcionários da empresa
*/
export interface Enterprise {
  company_id: string;
  cod_company: string;
  name: string;
  alias: string;
  register_number: string;
  website: string;
  createdAt: string;
  adresses: Adress[];
  phones: Phone[];
  emails: Email[];
  employes: User[];
}
