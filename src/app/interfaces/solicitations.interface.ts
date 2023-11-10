/**
 * @description Interface de solicitações.
 * @param pending_id Identificador único da solicitação.
 * @param company_id Identificador único da empresa.
 * @param user_id Identificador único do usuário.
 * @param applicant Nome do solicitante.
 * @param request Solicitação.
 * @param status Status da solicitação.
 * @param description Descrição da solicitação.
 * @param created_at Data de criação da solicitação.
 */
export interface Solicitation {
  pending_id: string;
  company_id: string;
  user_id: string;
  applicant: string;
  request: string;
  status: string;
  description: string;
  created_at: string;
}
