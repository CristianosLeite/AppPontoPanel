/**
 * @description Interface de banco de horas
 * @param banked_hour_id Identificador único do banco de horas
 * @param company_id Identificador único da empresa
 * @param user_id Identificador único do usuário
 * @param record_id Identificador único do registro de ponto
 * @param worked_date Data trabalhada
 * @param worked_hours Horas trabalhadas
 * @param intervals Intervalos
 * @param expected_hours Horas esperadas
 * @param banked_hours Horas acumuladas
 * @param created_at Data de criação do banco de horas
 */
export interface HoursBank {
  banked_hour_id: string;
  company_id: string;
  user_id: string;
  record_id: string;
  worked_date: string;
  worked_hours: TimeObject;
  intervals: TimeObject;
  expected_hours: TimeObject;
  banked_hours: TimeObject;
  created_at: string;
}

/**
 * @description Interface de objeto de tempo
 * @param hours Horas
 * @param minutes Minutos
 * @param seconds Segundos
*/
export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}
