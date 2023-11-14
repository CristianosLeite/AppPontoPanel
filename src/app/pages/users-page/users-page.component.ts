import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  constructor(private readonly usersService: UsersService) { }

  filterUser(tags: string[]) {
    this.usersService.filterUser(tags);
  }
}
