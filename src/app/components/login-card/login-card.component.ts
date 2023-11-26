import { Component } from '@angular/core';
import { ApiServices } from '../../services/api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

  cod_company: string = '';
  cod_user: string = '';

  constructor(
    private apiService: ApiServices,
    private router: Router,
  ) { }

  async requestLogin() {
    try {
      await this.apiService.login(this.cod_company, this.cod_user).then(async (response: any) => {
        if (response) {
          await this.router.navigate(['/home']);
          this.resetInputs();
        }
      });
      } catch (error) {
      throw error;
    }
  }

  private resetInputs() {
    this.cod_company = '';
    this.cod_user = '';
  }
}
