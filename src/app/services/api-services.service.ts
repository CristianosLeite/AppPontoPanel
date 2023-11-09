import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Enterprise } from '../interafaces/enterprise.interface';
import { User } from '../interafaces/user.interface';
import { DatabaseService } from './database.service';
import { Record } from '../interafaces/record.interface';


/**
 * @description Serviço responsável por realizar as requisições à API.
*/
@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  /**
   * @description URL base da API.
   * @param isDevMode Verifica se a aplicação está em modo de desenvolvimento.
   * @returns Retorna a URL base da API.
  */
  baseUrl = isDevMode() ? 'http://localhost:3000' : 'https://app-ponto-82a9efa89434.herokuapp.com';

  user = {} as User;
  enterprise = {} as Enterprise;

  constructor(private http: HttpClient, private database: DatabaseService) { }

  /**
   * @description Retorna o cabeçalho da requisição.
   * @returns Retorna um objeto HttpHeaders.
   * @throws Retorna um erro caso não seja possível buscar o cabeçalho.
   * @param token Token de autenticação.
  */
  private async headers(): Promise<HttpHeaders> {
    const token = await this.validateToken().then((response: any) => {
      return response.token;
    });
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Conection: 'keep-alive',
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }

  /**
   * @description Redireciona o usuário para a página de autenticação.
   * @param cod_company Código da empresa.
   * @param cod_user Código do usuário.
  */
  private getToken(cod_company: string, cod_user: string): void {
    try {
      window.location.assign(`${this.baseUrl}/api/login?cod_company=${cod_company}&cod_user=${cod_user}`);
    }
    catch (error) {
      throw error;
    }
  }

  async validateToken(): Promise<object> {
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${this.baseUrl}/api/login/validate-token`, null, { withCredentials: true })
      );

      await this.database.saveUser(response.user);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getEnterprise(companyId: string): Promise<Enterprise> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/enterprises/${companyId}`, { headers })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns Retorna o usuário logado.
   */
  async getSelfUser(): Promise<User> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/users/user`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Busca todos os usuários cadastrados no sistema.
   * @returns Retorna um array de objetos do tipo User.
   * @throws Retorna um erro caso não seja possível buscar os usuários.
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/users/all`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Busca todos os registros de ponto cadastrados no sistema por data.
   * @returns Retorna um array de objetos do tipo Record.
   * @throws Retorna um erro caso não seja possível buscar os registros de ponto.
   */
  async getAllRecordsByDate(date: string): Promise<Record[]> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/records/all?date=${date}`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Busca todos os registros de ponto cadastrados no sistema.
   * @returns Retorna um array de objetos do tipo Record.
   * @throws Retorna um erro caso não seja possível buscar os registros de ponto.
   */
  async getAllRecords(): Promise<Record[]> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/records/all`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Realiza o login do usuário.
   * @param cod_company
   * @param cod_user
   */
  async login(cod_company: string, cod_user: string): Promise<void> {
    this.getToken(cod_company, cod_user);
  }

  /**
   * Realiza o logout do usuário.
   */
  logout(): void {
    try {
      window.location.assign(`${this.baseUrl}/api/logout`);
      sessionStorage.clear();
      this.database.destroyDatabase();
    }
    catch (error) {
      throw error;
    }
  }

  async getSelfPendings(): Promise<any> {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/pendings/user`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}
