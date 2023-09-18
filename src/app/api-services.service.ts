import { ApiEndpoint } from './interafaces/api-endpoint.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './interafaces/user.interface';
import { Enterprise } from './interafaces/enterprise.interface';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  localHost = false;
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

  apiEndpoint: ApiEndpoint = {
    localHost: 'http://localhost:3000/api/test-api',
    webHost: '',
    userLogin: 'login?',
    enterpriseLogin: 'login/loginEnterprise?',
    validateToken: 'login/validateToken?',
    users: 'users',
    enterprises: 'enterprises',
    phones: '',
    emails: '',
    records: 'records'
  }

  constructor(private http: HttpClient) { }

  async testApi() {
    const isLocalApiRunning = await this.checkApiStatus(this.apiEndpoint.localHost);

    if (isLocalApiRunning) {
      this.localHost = true;
      return;
    }
  }

  private async checkApiStatus(url: string): Promise<boolean> {
    try {
      const res = await lastValueFrom(this.http.get(url, { responseType: 'text' }));
      return res === 'API is running!';
    } catch (error) {
      return false;
    }
  }

  async login(user: User): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    await lastValueFrom(this.http.post(`${this.apiEndpoint.localHost}/${this.apiEndpoint.userLogin}`, user, { headers })).then((data: any) => {
      this.token = data.token;
    });

    return this.token;
  }
}
