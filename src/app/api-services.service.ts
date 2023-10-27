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

  user = {} as User;
  enterprise = {} as Enterprise;

  constructor(private http: HttpClient, private database: DatabaseService) { }

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

  private getToken(companyId: string, userId: string): void {
    try {
      window.location.assign(`${this.baseUrl}/api/login?companyId=${companyId}&userId=${userId}`);
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

  async getEnterprise(companyId: string): Promise<any> {
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

  async getSelfUser() {
    try {
      const headers = await this.headers();
      const response: any = await lastValueFrom(
        this.http.get(`${this.baseUrl}/api/users/one`, { headers, withCredentials: true })
      );

      return response;
    } catch (error) {}
  }

  async getAllUsers(): Promise<any> {
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

  async getAllRecordsByDate(date: string): Promise<any> {
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

  async getAllRecords(): Promise<any> {
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

  async login(companyId: string, userId: string): Promise<any> {
    this.getToken(companyId, userId);
  }

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
}
