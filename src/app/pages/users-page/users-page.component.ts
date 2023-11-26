import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(private readonly usersService: UsersService, private readonly database: DatabaseService) { }

  role: string | null = null

  ngOnInit() {
    this.database.getUser().then(user => {
      this.role = user.role
    });
  }

  filterUsers(tags: string[]) {
    this.usersService.filterUsers(tags);
  }

  selectUser(users: User[]) {
    this.usersService.selectUsers(users);
  }
}
