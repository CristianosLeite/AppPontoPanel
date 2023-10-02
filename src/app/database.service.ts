import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { User } from './interafaces/user.interface';
import { Enterprise } from './interafaces/enterprise.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  user!: Table<User, number>;
  enterprise!: Table<Enterprise, number>;

  constructor() {
    super('PontoDatabase');
    this.version(1).stores({
      user: 'userId, companyId, name, role, token',
      enterprise: 'companyId, enterprise, register'
    });
  }

  async saveUser(user: User): Promise<void> {
    await this.table('user').put(user);
  }

  async saveEnterprise(enterprise: Enterprise): Promise<void> {
    await this.table('enterprise').put(enterprise);
  }

  async getUser(): Promise<User> {
    return await this.table('user').get(1);
  }

  async getEnterprise(): Promise<Enterprise> {
    return await this.table('enterprise').get(1);
  }

  async destroyDatabase(): Promise<void> {
    await this.delete();
  }
}
