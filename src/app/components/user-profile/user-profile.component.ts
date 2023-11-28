import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user = {} as User;

  constructor (private bsModalRef: BsModalRef, private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this.usersService.user;
    this.usersService.userLogged.subscribe((user) => {
      this.user = user;
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
