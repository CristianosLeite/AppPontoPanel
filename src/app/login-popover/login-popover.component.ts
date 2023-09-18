import { Component, ViewChild } from '@angular/core';
import { User } from '../interafaces/user.interface';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login-popover',
  templateUrl: './login-popover.component.html',
  styleUrls: ['./login-popover.component.scss']
})
export class LoginPopoverComponent {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  user = {} as User;

  showChildModal(): void {
    this.childModal?.show();
  }

  hideChildModal(): void {
    this.childModal?.hide();
  }

}
