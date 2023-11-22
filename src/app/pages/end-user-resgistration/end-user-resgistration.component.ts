import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-end-user-resgistration',
  templateUrl: './end-user-resgistration.component.html',
  styleUrls: ['./end-user-resgistration.component.scss']
})
export class EndUserResgistrationComponent {
  user = {} as User;

  constructor(private readonly usersService: UsersService) { }

}
