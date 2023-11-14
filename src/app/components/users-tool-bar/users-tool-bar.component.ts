import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AddEmailComponent } from '../add-user-information/add-email/add-email.component';
import { AddAdressComponent } from '../add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from '../add-user-information/add-phone/add-phone.component';

@Component({
  selector: 'app-users-tool-bar',
  templateUrl: './users-tool-bar.component.html',
  styleUrls: ['./users-tool-bar.component.scss']
})
export class UsersToolBarComponent {

  constructor(private readonly modalService: BsModalService) { }

  bsModalRef: BsModalRef | undefined;

  isSingleSelected: boolean = false;
  isMultipleSelected: boolean = false;

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

  createPending() {
    alert('Função não implementada!');
  }

  createSolicitation() {
    alert('Função não implementada!');
  }

  editUser() {
    alert('Função não implementada!');
  }

  deleteUser() {
    alert('Função não implementada!');
  }
}
