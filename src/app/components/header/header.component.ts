import { Component, OnInit, OnChanges } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ApiServices } from '../../services/api-services.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HeaderComponent implements OnInit, OnChanges {

  userName: string = '';

  constructor(private readonly api: ApiServices, private readonly database: DatabaseService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  ngOnChanges(): void {
    this.getUserName();
  }

  logout() {
    this.api.logout();
  }

  getUserName() {
    this.database.getUser().then((user: any) => {
      this.userName = user.name;
    });
  }
}
