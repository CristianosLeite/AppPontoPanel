import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login-popover',
  templateUrl: './login-popover.component.html',
  styleUrls: ['./login-popover.component.scss']
})
export class LoginPopoverComponent {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  showChildModal(): void {
    this.childModal?.show();
  }

  hideChildModal(): void {
    this.childModal?.hide();
  }

}
