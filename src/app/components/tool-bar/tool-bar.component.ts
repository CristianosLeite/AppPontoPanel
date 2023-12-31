import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { WarningPromptComponent } from '../warning-prompt/warning-prompt.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})

export class ToolBarComponent implements OnInit {

  /**
   * @description Define quais botões serão exibidos no componente de acordo com o contexto.
   * @default listUsers
   * @type {string}
   * @aceptedValues listUsers | edit | isEdited
   */
  @Input() context: string = 'listUsers';

  @Input() message?: string;
  bsModalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  isLoading: boolean = false;

  constructor(
    private readonly modalService: BsModalService,
    private readonly usersService: UsersService,
    private readonly location: Location
  ) { }


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

  openWarningModal() {
    this.bsModalRef = this.modalService.show(WarningPromptComponent,
      { class: 'modal-sm', ignoreBackdropClick: true });
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

  comeBack() {
    this.location.back();
  }
}
