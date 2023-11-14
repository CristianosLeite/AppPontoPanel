import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { ApiServices } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly api: ApiServices) { }
  @Output() usersLoaded = new EventEmitter<User[]>();

  users = [] as User[];

  async getUsers() {
    await this.api.getAllUsers().then((users: User[]) => {
      this.users = users;
      this.usersLoaded.emit(this.users);
    });
    return this.users;
  }

  filterUser(tags: string[]) {
    if (tags.length === 0) {
      this.usersLoaded.emit(this.users);
      return this.users;
    }
    const userNameList = tags.map(tag => tag.toLowerCase());
    const filteredValues = this.users.filter((user: User) => {
      return userNameList.some(name =>
        name === user.first_name.toLowerCase() ||
        name === user.last_name.toLowerCase() ||
        name === user.first_name.toLowerCase() + ' ' + user.last_name.toLowerCase()
      );
    });
    this.usersLoaded.emit(filteredValues);
    return filteredValues;
  }
}
