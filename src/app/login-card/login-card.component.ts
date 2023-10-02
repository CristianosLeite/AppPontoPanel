import { Component } from '@angular/core';
import { User } from '../interafaces/user.interface';
import { ApiServicesService } from '../api-services.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

  user = {} as User;
  companyId: string = '';
  userId: string = '';

  constructor(
    private apiService: ApiServicesService,
    private databaseService: DatabaseService
  ) { }

  requestLogin(): void {
    this.apiService.login(this.companyId, this.userId).then((response) => {
      if (response) {
        console.log(response);
        this.user = response.user;
        this.databaseService.saveUser(this.user);
      }
    }
    ).catch((error) => {
      console.log(error);
    });
  }
}
