import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HeaderComponent implements OnInit {

  userName: string = '';

  constructor(private readonly userServices: UsersService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  logout() {
    this.userServices.logout();
  }

  getUserName() {
    this.userName = this.userServices.user?.first_name + ' ' + this.userServices.user?.last_name;
    this.userServices.userLogged.subscribe((user: User) => {
      this.userName = user.first_name + ' ' + user.last_name;
    });
  }
}
