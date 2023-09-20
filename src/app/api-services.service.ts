import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './interafaces/user.interface';
import { Enterprise } from './interafaces/enterprise.interface';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  user = {} as User;
  enterprise = {} as Enterprise;
  token: string | null = null;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Conection: 'keep-alive',
    Accept: '*/*',
  });

  constructor(private http: HttpClient) { }

  async testApi(): Promise<string> {
    try {
      const apiStatus = await lastValueFrom(this.http.get('https://app-ponto-82a9efa89434.herokuapp.com/api/test-api', { responseType: 'text' }));
      return apiStatus;
    }
    catch (error) {
      console.log(error);
      return 'error';
    }
  }

  async getUser(companyId: string, userId: string): Promise<object> {
    try {
      const response = await lastValueFrom(this.http.post(
        `https://app-ponto-82a9efa89434.herokuapp.com/api/login?companyId=${companyId}&userId=${userId}`, { responseType: 'json' }));
      return response;
  }
    catch (error) {
      console.log(error);
      return {error};
    }
  }

  login() {}
}
