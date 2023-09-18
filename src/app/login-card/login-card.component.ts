import { Component } from '@angular/core';
import { User } from '../interafaces/user.interface';
import { ApiServicesService } from '../api-services.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

  user = {} as User;

  constructor(private apiService: ApiServicesService) { }

  requestLogin(): void {
    this.apiService.login(this.user);
  }

}
