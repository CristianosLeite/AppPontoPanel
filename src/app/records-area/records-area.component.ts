import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../api-services.service';
import { DatabaseService } from '../database.service';
import { User } from '../interafaces/user.interface';
import { Record } from '../interafaces/record.interface';

@Component({
  selector: 'app-records-area',
  templateUrl: './records-area.component.html',
  styleUrls: ['./records-area.component.scss']
})
export class RecordsAreaComponent implements OnInit {

  records = [] as Record[];

  newDate = new Date().toLocaleDateString();

  constructor(private readonly api: ApiServicesService, private readonly database: DatabaseService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getEnterprise() {
    try {
      const response: User = await this.api.getEnterprise([await this.database.getUser()][0]['companyId']);
      this.records = response.records;
      console.log(this.records);
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const response: User = await this.api.getUsers([await this.database.getUser()][0]['companyId']);
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
}
