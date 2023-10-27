import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiServicesService } from '../api-services.service';
import { Record } from '../interafaces/record.interface';
import { User } from '../interafaces/user.interface';

@Component({
  selector: 'app-records-area',
  templateUrl: './records-area.component.html',
  styleUrls: ['./records-area.component.scss'],
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

export class RecordsAreaComponent implements OnInit, OnChanges {

  date = new Date().toUTCString();
  users = [] as User[];
  records = [] as Record[];

  loaded: boolean = false;

  constructor(private readonly api: ApiServicesService) { }

  async ngOnInit() {
    await this.getUsers();
    await this.getRecords();
    this.loadRecordsArea();
  }

  ngOnChanges() {
    this.loadRecordsArea();
  }

  async getUsers() {
    try {
      await this.api.getAllUsers().then((response: User[]) => {
        this.users = response;
      });
    } catch (error) {
      throw error;
    }
  }

  async getRecords() {
    try {
      await this.api.getAllRecordsByDate(this.date).then((response: Record[]) => {
        this.records = response;
      });
    } catch (error) {
      throw error;
    }
  }

  public loadRecordsArea() {
    this.users.forEach((user: User) => {
      const userRecords = [] as Record[];
      this.records.forEach((record: Record) => {
        if (record.user_id === user.user_id) {
          userRecords.unshift(record);
        }
      });
      if (userRecords.length > 0) {
        if (userRecords.length === 1) {
          this.processSingleRecord(user, userRecords);
        } else if (userRecords.length > 1) {
          this.processMultipleRecords(user, userRecords);
        }
      } else {
        user.status = false;
      }
    });
    this.loaded = true;
  }

  private processSingleRecord(user: User, record: Record[]) {
    const arriveAt: string[] = [];
    user.status = true;
    Object.values(record[0].record_time).forEach((value) => {
      Number(value) < 10 ? arriveAt.push(`0${value}`) : arriveAt.push(`${value}`);
    });
    user.arrivedAt = arriveAt.join(':');
    user.leftAt = 'Sem registro';
    user.extraHours = '00:00:00';
    user.totalHours = () => {
      const dateNow = new Date();
      const timeNow = Date.now();

      const arrivedAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.arrivedAt?.split(':')[0]),
        Number(user.arrivedAt?.split(':')[1]), Number(user.arrivedAt?.split(':')[2])
      ).getTime();

      const hour = Math.floor((timeNow - arrivedAt) / 3600000);
      const minute = Math.floor(((timeNow - arrivedAt) % 3600000) / 60000);
      const seconds = Math.floor((((timeNow - arrivedAt) % 3600000) % 60000) / 1000);

      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    user.missingHours = () => {
      const missingHours = [] as string[];
      const dateNow = new Date();

      Object.values(record[0].hours_bank[0].expected_hours).forEach((value) => {
        Number(value) < 10 ? missingHours.push(`0${value}`) : missingHours.push(`${value}`);
      });

      const totalWorkedHours = user.totalHours();

      const workedHours = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(totalWorkedHours.split(':')[0]),
        Number(totalWorkedHours.split(':')[1]), Number(totalWorkedHours.split(':')[2])
      ).getTime();

      const expectedHour = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(missingHours.join(':').split(':')[0]),
        Number(missingHours.join(':').split(':')[1]), Number(missingHours.join(':').split(':')[2])
      ).getTime();

      let hour = Math.floor((workedHours - expectedHour) / 3600000) * -1 - 1;
      let minute = Math.floor(((workedHours - expectedHour) % 3600000) / 60000) * -1;
      let seconds = Math.floor((((workedHours - expectedHour) % 3600000) % 60000) / 1000) * -1;

      hour < 0 ? hour = 0 : hour = hour;
      minute < 0 ? minute = 0 : minute = minute;
      seconds < 0 ? seconds = 0 : seconds = seconds;

      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  }

  private processMultipleRecords(user: User, records: Record[]) {
    const arriveAt: string[] = [];
    const leftAt: string[] = [];
    user.status = null;
    Object.values(records[0].record_time).forEach((value) => {
      Number(value) < 10 ? arriveAt.push(`0${value}`) : arriveAt.push(`${value}`);
    });
    Object.values(records[records.length - 1].record_time).forEach((value) => {
      Number(value) < 10 ? leftAt.push(`0${value}`) : leftAt.push(`${value}`);
    });
    user.arrivedAt = arriveAt.join(':');
    user.leftAt = leftAt.join(':');
    user.extraHours = '00:00:00';
    user.missingHours = () => '00:00:00';
    user.totalHours = () => {
      const dateNow = new Date();

      const arrivedAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.arrivedAt?.split(':')[0]),
        Number(user.arrivedAt?.split(':')[1]), Number(user.arrivedAt?.split(':')[2])
      ).getTime();

      const leftAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.leftAt?.split(':')[0]),
        Number(user.leftAt?.split(':')[1]), Number(user.leftAt?.split(':')[2])
      ).getTime();

      const hour = Math.floor((leftAt - arrivedAt) / 3600000);
      const minute = Math.floor(((leftAt - arrivedAt) % 3600000) / 60000);
      const seconds = Math.floor((((leftAt - arrivedAt) % 3600000) % 60000) / 1000);

      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  }

  openModal(user: User) { }
}
