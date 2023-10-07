import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Enterprise } from './interafaces/enterprise.interface';
import { User } from './interafaces/user.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  baseUrl = isDevMode() ? 'http://localhost:3000' : 'https://app-ponto-82a9efa89434.herokuapp.com';

  token: string | undefined;

  user = {} as User;
  enterprise = {} as Enterprise;

  constructor(private http: HttpClient, private database: DatabaseService) { }

  private getToken(companyId: string, userId: string): void {
    try {
      window.location.assign(`${this.baseUrl}/api/login?companyId=${companyId}&userId=${userId}`);
    }
    catch (error) {
      throw error;
    }
  }

  async validateToken(): Promise<object> {
    try{
      const response: any = await lastValueFrom(
        this.http.post(`${this.baseUrl}/api/login/validate-token`, null, { withCredentials: true })
      );

      await this.database.saveUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getEnterprise(companyId: string): Promise<any> {
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Conection: 'keep-alive',
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      const response: any = await lastValueFrom(this.http.get(`${this.baseUrl}/api/enterprises/${companyId}`, { headers }));

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUser(companyId: string, userId: string): Promise<any> {
    try {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        Conection: 'keep-alive',
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      const response: any = await lastValueFrom(this.http.get(`${this.baseUrl}/api/users/${companyId}/${userId}`, { headers }));

      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(companyId: string, userId: string): Promise<any> {
    this.getToken(companyId, userId);
  }
}
