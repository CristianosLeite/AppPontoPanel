import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../interafaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: string = 'manager';

  constructor(
    private databaseService: DatabaseService
  ) {}

  async ngOnInit() {
    await this.getUser();
  }

  async getUser() {
    await this.databaseService.getUser();
  }
}
