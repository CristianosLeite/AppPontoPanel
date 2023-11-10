import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/interfaces/user.interface';
import { ApiServices } from 'src/app/services/api-services.service';
import { Enterprise } from 'src/app/interfaces/enterprise.interface';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AddEmailComponent } from '../add-user-information/add-email/add-email.component';
import { AddAdressComponent } from '../add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from '../add-user-information/add-phone/add-phone.component';


@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.scss']
})
export class UsersComponentComponent {

  constructor(private readonly modalService: BsModalService, private readonly api: ApiServices) { }

  bsModalRef: BsModalRef | undefined;

  users = [] as User[];
  enterprise = {} as Enterprise;

  async ngOnInit() {
    Promise.all([
      this.getUsers(),
      this.getEnterprise(),
    ]);
  }

  async getUsers() {
    await this.api.getAllUsers().then((response: User[]) => {
      this.users = response;
    });
  }

  async getEnterprise() {
    await this.api.getSelfEnterprise().then((response: Enterprise) => {
      this.enterprise = response;
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
