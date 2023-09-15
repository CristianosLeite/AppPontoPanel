import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AddEmailComponent } from '../add-user-information/add-email/add-email.component';
import { AddAdressComponent } from '../add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from '../add-user-information/add-phone/add-phone.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  users: any[] = [];
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjI1NjE0NCIsImNvbXBhbnlJZCI6IjMxNDI3MiIsImRhdGVSZWNvcmQiOiIyMDIzLTA0LTA3IiwibmFtZSI6IkNyaXN0aWFubyIsInJlZ2lzdGVyIjoiMTIyNTM0NzE2NTgiLCJ1c2VyVHlwZSI6InVzZXIiLCJoYXNJbnRlcnZhbCI6dHJ1ZSwid29ya1NjaGVkdWxlIjoiIiwib25WYWNhdGlvbiI6bnVsbCwiYWRkcmVzcyI6bnVsbCwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsInppcENvZGUiOm51bGwsImNvdW50cnkiOm51bGwsInBob25lIjpudWxsLCJlbWFpbCI6IjV4MiJ9LCJpYXQiOjE2OTQ3MTY0NDh9.Z1lC2Qf7wf7OcQ4cKdF2YP6wyJobxdHw2vihqzBzF48'
  userEnterprise = {}

  constructor(private http: HttpClient, private modalService: BsModalService) { }

  bsModalRef: BsModalRef | undefined;

  async ngOnInit() {
    await this.getUsers();
  }

  async getEnterprise(companyId: string): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    await lastValueFrom(this.http.get(`localhost:3000/api/login/loginEnterprise?companyId=${companyId}`, {headers})).then((data: any) => {
      this.userEnterprise = data;
    });
  }

  async getUsers(): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    this.http.get('http://localhost:3000/api/users/314272', {headers}).subscribe((data: any) => {
      this.users = data;
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    await lastValueFrom(this.http.delete(`http://localhost:3000/api/users/${userId}`, {headers})).then((data: any) => {
      console.log(data);
    });
  }

  async createUser(): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    await lastValueFrom(this.http.post('http://localhost:3000/api/users', {headers})).then((data: any) => {
      console.log(data);
    });
  }

  async updateUser(userId: string): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Conection: 'keep-alive',
      Accept: '*/*',
    });
    await lastValueFrom(this.http.put(`http://localhost:3000/api/users/${userId}`, {headers})).then((data: any) => {
      console.log(data);
    });
  }

  openUserModal() {
    this.bsModalRef = this.modalService.show(CreateUserComponent, { class: 'modal-lg' });
  }

  openEmailModal() {
    this.bsModalRef = this.modalService.show(AddEmailComponent);
  }

  openAddressModal() {
    this.bsModalRef = this.modalService.show(AddAdressComponent);
  }

  openPhoneModal() {
    this.bsModalRef = this.modalService.show(AddPhoneComponent);
  }
}
