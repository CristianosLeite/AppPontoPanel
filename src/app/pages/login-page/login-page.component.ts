import { Component } from '@angular/core';
import { NotFoundService } from 'src/app/services/not-found.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private readonly notFound: NotFoundService) { }

  notFoundError() {
    this.notFound.notFound.emit('');
  }
}
