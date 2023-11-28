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

  role: Role['role_name'] | undefined = undefined;

  constructor(private readonly notFound: NotFoundService, private readonly usersService: UsersService) { };

  ngOnInit(): void {
    try {
      this.role = this.usersService.user?.role.role_name;
      this.usersService.userLogged.subscribe((user: User) => {
        this.role = user.role.role_name;
      });
    } catch (error) {
      this.role === undefined ? this.notFound.notFound.emit('clientError') : null;
      console.log('Usuário não autenticado')
    }
  }
}
