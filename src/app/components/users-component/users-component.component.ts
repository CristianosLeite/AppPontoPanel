import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges } from '@angular/core';
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
  styleUrls: ['./users-component.component.scss'],
  animations: [
    trigger('loadingTable', [
      state('loading', style({
        opacity: 0
      })),
      transition('loading => *', [
        animate('500ms ease-in-out')
      ]),
    ]),
    trigger('loadingCard', [
      state('loading', style({
        opacity: 0.5
      })),
      transition('* => loading', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ],
})
export class UsersComponentComponent implements OnInit, OnChanges {

  constructor(private readonly modalService: BsModalService, private readonly api: ApiServices) { }

  bsModalRef: BsModalRef | undefined;

  users = [] as User[];

  filterTags = [] as string[];

  enterprise = {} as Enterprise;

  loaded: boolean = false;

  async ngOnInit() {
    Promise.all([
      await this.getUsers(),
      this.getEnterprise().then(() => {
        this.loaded = true;
      }),
    ]);
  }

  ngOnChanges() {
    this.filterUser(this.filterTags);
  }

  async getUsers() {
    await this.api.getAllUsers().then((users: User[]) => {
      this.users = users;
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

  filterUser(tags: string[]) {
    if (tags.length === 0) {
      return this.users;
    }
    this.filterTags = tags;
    const userNameList = this.filterTags.map(tag => tag.toLowerCase());
    return this.users.filter((user: User) => {
      return userNameList.some(name =>
        name === user.first_name.toLowerCase() ||
        name === user.last_name.toLowerCase() ||
        name === user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase()
      );
    });
  }
}
