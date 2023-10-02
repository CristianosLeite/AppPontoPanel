import { Component } from '@angular/core';
import { User } from '../interafaces/user.interface';
import { ApiServicesService } from '../api-services.service';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    private databaseService: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  requestLogin() {
    this.apiService.login(this.companyId, this.userId).then(async (response) => {
      if (response) {
        this.user = response.user;
        await this.databaseService.saveUser(this.user);
        this.router.navigate(['/home'], {relativeTo: this.route});
      }
    }
    ).catch((error) => {
      console.log(error);
    });
  }
}
