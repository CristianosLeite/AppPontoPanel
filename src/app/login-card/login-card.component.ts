import { Component } from '@angular/core';
import { ApiServicesService } from '../api-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {

  companyId: string = '';
  userId: string = '';

  constructor(
    private apiService: ApiServicesService,
    private router: Router,
  ) { }

  async requestLogin() {
    try {
      await this.apiService.login(this.companyId, this.userId).then(async (response: any) => {
        response ? this.router.navigate(['/home']) : this.navigate();
      });
      } catch (error) {
      throw error;
    }
  }

  navigate() {
    window.location.href = `${this.apiService.baseUrl}/api/login?companyId=${this.companyId}&userId=${this.userId}`;
  }
}
