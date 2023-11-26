import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { DatabaseService } from 'src/app/services/database.service';
import { NotFoundService } from 'src/app/services/not-found.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    private readonly usersService: UsersService,
    private readonly database: DatabaseService,
    private readonly notFound: NotFoundService
    ) { }

  role: string | null = null

  ngOnInit() {
    this.database.getUser().then(user => {
      this.role = user.role
    }).catch(() => {
      console.log('Usuário não autenticado.');
      this.notFound.notFound.emit('clientError');
    });
  }

  filterUsers(tags: string[]) {
    this.usersService.filterUsers(tags);
  }

  selectUser(users: User[]) {
    this.usersService.selectUsers(users);
  }
}
