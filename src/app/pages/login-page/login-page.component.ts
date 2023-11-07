import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../../services/api-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly apiService: ApiServices,
    private readonly router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.validateToken();
  }

  async validateToken() {
    try {
      await this.apiService.validateToken().then(() => {
        this.router.navigate(['/home']);
      });
    } catch (error) {
      //console.log(error);
    }
  }
}
