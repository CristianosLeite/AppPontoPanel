import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { NotFoundService } from 'src/app/services/not-found.service';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: Role| undefined = undefined;

  constructor(
    private readonly usersService: UsersService,
    private readonly notFound: NotFoundService
  ) { };

  ngOnInit() {
    this.role = this.usersService.user.role;
    this.usersService.userLogged.subscribe((user: User) => {
      this.role = user.role;
    });

    setTimeout(() => {
      this.role === undefined ? this.notFound.notFoundEvent.emit('clientError') : null;
    }, 100);
  }
}
