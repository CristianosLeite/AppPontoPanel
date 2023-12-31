import { Adress } from './adress.interface';
import { Enterprise } from './enterprise.interface';
import { Phone } from './phone.interface';
import { Role } from './role.interface';

/**
 * @description Interface de usuário
 * @param user_id Identificador único do usuário
 * @param company_id Identificador único da empresa
 * @param cod_user Código do usuário
 * @param name Nome completo do usuário
 * @param first_name Primeiro nome do usuário
 * @param last_name Sobrenome do usuário
 * @param profile_photo Foto de perfil do usuário
 * @param register_number Número do CPF do usuário
 * @param email Email do usuário
 * @param role Nível de acesso do usuário
 * @param situation Situação do usuário (Activated, Deactivated, Blocked)
 * @param created_at Data de criação do usuário
 * @param addresses Endereços do usuário
 * @param phones Telefones do usuário
 * @param enterprise Empresa do usuário
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
  cod_user: string;
  name: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  register_number: string;
  email: string;
  role: Role;
  situation: string;
  created_at?: string;
  addresses?: Adress[];
  phones?: Phone[];
  enterprise: Enterprise;
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
 /**
  * @description Indica se o usuário está selecionado na tabela.
  */
  selected?: boolean;
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
