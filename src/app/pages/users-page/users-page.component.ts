import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  constructor(private readonly usersService: UsersService) { }

  filterUsers(tags: string[]) {
    this.usersService.filterUsers(tags);
  }

  selectUser(users: User[]) {
    this.usersService.selectUsers(users);
  }
}
