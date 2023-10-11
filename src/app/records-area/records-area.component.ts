import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api-services.service';
import { DatabaseService } from '../database.service';
import { User } from '../interafaces/user.interface';

@Component({
  selector: 'app-records-area',
  templateUrl: './records-area.component.html',
  styleUrls: ['./records-area.component.scss']
})
export class RecordsAreaComponent implements OnInit {

  users  = [] as User[];

  newDate = new Date().toLocaleDateString();

  constructor(private readonly api: ApiServicesService, private readonly database: DatabaseService) { }

  async ngOnInit() {
    await this.getUsers().then(() => {
    });
  }

  async getUsers() {
    try {
      await this.api.getUsers([await this.database.getUser()][0]['companyId']).then((response: User[]) => {
        this.users = response;
      });
    } catch (error) {
      throw error;
    }
  }
}
