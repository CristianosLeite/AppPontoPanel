import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiServices } from '../../services/api-services.service';
import { Record } from '../../interfaces/record.interface';
import { User } from '../../interfaces/user.interface';
import { interval, Subscription } from 'rxjs';
import { RecordsService } from 'src/app/services/records.service';

/**
 * @description Exibe registro de ponto de todos os usuários na tela inicial do painel do gestor.
 * @param date Data atual
 * @param loggedUser Usuário logado
 * @param users Usuários cadastrados no sistema
 * @param records Registros de ponto cadastrados no sistema
 * @param loaded Indica se os registros de ponto já foram carregados
 */
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
    await Promise.all([this.getUsers(), this.getRecords()]);
    this.loadRecordsArea();
    this.subscription.add(interval(60000).subscribe(async () => { //Intervalo de 1 minuto
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

  /**
   * @description Busca todos os usuários cadastrados no sistema.
  */
  async getUsers() {
    await this.api.getAllUsers().then((response: User[]) => {
      this.users = response;
    });
  }

  /**
   * @description Busca todos os registros de ponto cadastrados no sistema.
  */
  async getRecords() {
    await this.api.getAllRecordsByDate(this.date).then((response: Record[]) => {
      this.records = response;
    });
  }

  /**
   * @description Carrega os registros de ponto na tela inicial do painel do gestor.
  */
  public loadRecordsArea() {
    // Compara os registros de ponto com os usuários cadastrados no sistema.
    this.users.forEach((user: User) => {
      const userRecords = [] as Record[];
      this.records.forEach((record: Record) => {
        if (record.user_id === user.user_id) {
          userRecords.unshift(record); // Insere o registro no início do array
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
