import { Injectable } from '@angular/core';
import { Enterprise } from '../interfaces/enterprise.interface';
import { ApiServices } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class EnterprisesService {

  constructor(private readonly api: ApiServices) { }

  enterprise = {} as Enterprise;

  async getEnterprise() {
    await this.api.getSelfEnterprise().then((response: Enterprise) => {
      this.enterprise = response;
    });
  }
}
