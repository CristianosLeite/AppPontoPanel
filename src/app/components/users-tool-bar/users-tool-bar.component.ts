import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-tool-bar',
  templateUrl: './users-tool-bar.component.html',
  styleUrls: ['./users-tool-bar.component.scss']
})

export class UsersToolBarComponent implements OnInit {
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  isLoading: boolean = false;

  constructor(
    private readonly modalService: BsModalService,
    private readonly usersService: UsersService,
  ) { }

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
    this.bsModalRef = this.modalService.show(CreateUserComponent, this.config);
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

  disableUser(user: User) {
    this.usersService.disableUser(user);
  }
}
