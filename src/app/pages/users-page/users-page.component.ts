import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { NotFoundService } from 'src/app/services/not-found.service';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    private readonly usersService: UsersService,
    private readonly notFound: NotFoundService
  ) { }

  role: Role | undefined = undefined;

  ngOnInit() {
    this.role = this.usersService.user?.role;
    this.usersService.userLogged.subscribe((user: User) => {
      this.role = user.role;
    });

    setTimeout(() => {
      this.role === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 100);
  }

  filterUsers(tags: string[]) {
    this.usersService.filterUsers(tags);
  }

  selectUser(users: User[]) {
    this.usersService.selectUsers(users);
  }
}
