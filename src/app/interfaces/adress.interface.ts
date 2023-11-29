/**
 * @description Interface Endereço
 * @param adress_id Identificador único do endereço
 * @param user_id Identificador único do usuário
 * @param company_id Identificador único da empresa
 * @param street Rua
 * @param number Número
 * @param complement Complemento
 * @param neighborhood Bairro
 * @param city Cidade
 * @param state Estado
 * @param country País
 * @param zip_code CEP
 * @param created_at Data de criação do endereço
*/
export interface Adress {
  adress_id: string;
  user_id: string;
  company_id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at: string;
}
