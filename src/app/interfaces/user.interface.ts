import { Adress } from './adress.interface';
import { Phone } from './phone.interface';
import { Record } from './record.interface';

/**
 * @description Interface de usuário
 * @param user_id Identificador único do usuário
 * @param company_id Identificador único da empresa
 * @param first_name Primeiro nome do usuário
 * @param last_name Sobrenome do usuário
 * @param register_number Número do CPF do usuário
 * @param email Email do usuário
 * @param role Cargo do usuário
 * @param created_at Data de criação do usuário
 * @param adresses Endereços do usuário
 * @param phones Telefones do usuário
 * @param records Registros de ponto do usuário
 * @param status Status do usuário
 * @param arrivedAt Hora de chegada do usuário
 * @param leftAt Hora de saída do usuário
 * @param extraHours Horas extras trabalhadas pelo usuário
 * @param missingHours Horas faltantes para o usuário cumprir a carga horária
 * @param totalHours Total de horas trabalhadas pelo usuário
*/
export interface User {
  user_id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  register_number: string;
  email: string;
  role: string;
  created_at?: string;
  adresses?: Adress[];
  phones?: Phone[];
  records: Record;
  /**
   * @description Indica se o usuário registrou ponto no dia.
   * @param true Usuário registrou ponto no dia.
   * @param false Usuário não registrou ponto no dia.
   * @param null Usuário registrou a entrada e a saída no dia.
   * @default false Usuário não registrou ponto no dia.
  */
  status?: boolean | null;

  /**
   * @description Hora de chegada do usuário
  */
  arrivedAt?: string;
  /**
   * @description Hora de saída do usuário
  */
  leftAt?: string;
  /**
   * @returns Retorna a quantidade de horas extras que o usuário trabalhou no dia
   * @description Se o usuário não tiver registrado a saída deverá retornar: '00:00:00'.
  */
  extraHours: () => string;
  /**
   * @returns Retorna a quantidade de horas que o usuário deveria ter trabalhado no dia
   */
  missingHours: () => string;
  /**
   * @returns Total de horas trabalhadas pelo usuário
   */
  totalHours: () => string;
}