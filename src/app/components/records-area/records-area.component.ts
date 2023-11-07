import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiServices } from '../../services/api-services.service';
import { Record } from '../../interafaces/record.interface';
import { User } from '../../interafaces/user.interface';
import { interval, Subscription } from 'rxjs';
import { RecordsService } from 'src/app/services/records.service';


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

export class RecordsAreaComponent implements OnInit, OnChanges, OnDestroy {
  private subscription: Subscription = new Subscription();

  date = new Date().toUTCString();
  loggedUser = {} as User;
  users = [] as User[];
  records = [] as Record[];

  loaded: boolean = false;

  constructor(private readonly api: ApiServices, private readonly record: RecordsService) { }

  async ngOnInit() {
    await this.api.getSelfUser().then((response: User) => {
      this.loggedUser = response;
    });
    await this.getUsers();
    await this.getRecords();
    this.loadRecordsArea();
    this.subscription.add(interval(60000).subscribe(async () => { // Atualiza o componente a cada 1 minuto.
      await this.getRecords();
      this.loadRecordsArea();
    }));
  }

  ngOnChanges() {
    this.loadRecordsArea();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
          this.record.processSingleRecord(user, userRecords);
        } else if (userRecords.length > 1) {
          this.record.processMultipleRecords(user, userRecords);
        }
      } else {
        user.status = false;
      }
    });
    this.loaded = true;
  }

  openModal(user: User) {
    alert('Funcionalidade em desenvolvimento');
  }
}
