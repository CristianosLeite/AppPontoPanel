/**
 * @description Interface de pendências.
 * @param pending_id Identificador único da pendência.
 * @param company_id Identificador único da empresa.
 * @param user_id Identificador único do usuário.
 * @param applicant Nome do solicitante.
 * @param request Solicitação.
 * @param status Status da pendência.
 * @param description Descrição da pendência.
 * @param created_at Data de criação da pendência.
 */
export interface Pendings {
  pending_id: string;
  company_id: string;
  user_id: string;
  applicant: string;
  request: string;
  status: string;
  description: string;
  created_at: string;
}
