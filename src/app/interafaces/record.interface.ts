import { HoursBank, TimeObject } from "./hours-bank.interface";

/**
 * @description Interface de registro de ponto
 * @param record_id Identificador único do registro de ponto
 * @param company_id Identificador único da empresa
 * @param user_id Identificador único do usuário
 * @param record_date Data do registro de ponto
 * @param record_time Hora do registro de ponto
 * @param record_location Local de registro de ponto
 * @param record_photo Foto do registro de ponto
 * @param record_status Status do registro de ponto
 * @param created_at Data de criação do registro de ponto
 * @param hours_bank Bancos de horas
 * @param intervals Intervalos
  */
export interface Record {
  record_id: string;
  company_id: string;
  user_id: string;
  record_date: string;
  record_time: TimeObject;
  record_location?: string;
  record_photo?: string;
  record_status?: string;
  created_at?: string;
  hours_bank: HoursBank[];
  intervals?: [{key: string, value: string }];
}
