import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AddEmailComponent } from '../add-user-information/add-email/add-email.component';
import { AddAdressComponent } from '../add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from '../add-user-information/add-phone/add-phone.component';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-tool-bar',
  templateUrl: './users-tool-bar.component.html',
  styleUrls: ['./users-tool-bar.component.scss']
})
export class UsersToolBarComponent implements OnInit {

  constructor(private readonly modalService: BsModalService, private readonly usersService: UsersService) { }

  bsModalRef: BsModalRef | undefined;

  isSingleSelected: boolean = false;
  isMultipleSelected: boolean = false;

  selectedUsers = [] as User[];

  ngOnInit(): void {
    this.usersService.usersSelected.subscribe((users: User[]) => {
      this.selectedUsers = users;
      this.isSingleSelected = this.selectedUsers.length === 1;
      this.isMultipleSelected = this.selectedUsers.length > 1;
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
