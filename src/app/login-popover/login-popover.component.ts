import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../interafaces/user.interface';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login-popover',
  templateUrl: './login-popover.component.html',
  styleUrls: ['./login-popover.component.scss']
})
export class LoginPopoverComponent implements OnInit {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  user = {} as User;

  constructor() { }

  ngOnInit(): void {

  }

  showChildModal(): void {
    this.childModal?.show();
  }

  hideChildModal(): void {
    this.childModal?.hide();
  }

  reset() {}
}
