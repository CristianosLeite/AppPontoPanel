import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-end-user-resgistration',
  templateUrl: './finish-registration.html',
  styleUrls: ['./finish-registration.scss']
})
export class FinishRegistration {
  user = {} as User;

  constructor(private readonly usersService: UsersService) { }

}
