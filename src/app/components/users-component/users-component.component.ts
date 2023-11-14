import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.scss'],
  animations: [
    trigger('loadingTable', [
      state('loading', style({
        opacity: 0
      })),
      transition('loading => *', [
        animate('500ms ease-in-out')
      ]),
    ]),
    trigger('loadingCard', [
      state('loading', style({
        opacity: 0.5
      })),
      transition('* => loading', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ],
})
export class UsersComponentComponent implements OnInit {

  constructor(private readonly usersService: UsersService) { }

  users = [] as User[];
  loaded: boolean = false;

  ngOnInit(): void {
    this.usersService.usersLoaded.subscribe((users: User[]) => {
      this.users = users;
    });
    this.usersService.getUsers().then(() => {
      this.loaded = true;
    });
  }

  selectAll(event: Event) {
    this.users.forEach(user => {
      user.selected = (event.target as HTMLInputElement).checked;
    });
  }
}
