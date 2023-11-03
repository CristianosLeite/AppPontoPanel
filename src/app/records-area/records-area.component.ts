import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiServices } from '../api-services.service';
import { Record } from '../interafaces/record.interface';
import { User } from '../interafaces/user.interface';
import { interval, Subscription } from 'rxjs';


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

  constructor(private readonly api: ApiServices) { }

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

  /*
  * Processa um único registro de ponto, no caso de o usuário ter apenas registrado a entrada.
  */
  private processSingleRecord(user: User, record: Record[]) {
    const arriveAt: string[] = [];
    // Define as propriedades do usuário.
    user.status = true; // Se o usuário tiver registrado a entrada, seu status é true.
    // Formata a hora de chegada do usuário. Ex: 08:00:00. O retorno da api é um array com os valores separados.
    Object.values(record[0].record_time).forEach((value) => {
      Number(value) < 10 ? arriveAt.push(`0${value}`) : arriveAt.push(`${value}`);
    });
    user.arrivedAt = arriveAt.join(':'); // Informação que será exibida na tabela.
    user.leftAt = 'Sem registro'; // Caso o usuário tenha apenas um registro assume-se que ele não registrou a saída.
    user.extraHours = '00:00:00'; // Se o usuário não registrou a saída, não há horas extras.
    user.totalHours = () => {
      const dateNow = new Date();
      const timeNow = Date.now();
      // Formata a hora de chegada do usuário para o formato de data.
      const arrivedAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.arrivedAt?.split(':')[0]),
        Number(user.arrivedAt?.split(':')[1]), Number(user.arrivedAt?.split(':')[2])
      ).getTime();

      // Calcula a diferença entre a hora atual e a hora de chegada do usuário.
      const hour = Math.floor((timeNow - arrivedAt) / 3600000);
      const minute = Math.floor(((timeNow - arrivedAt) % 3600000) / 60000);
      const seconds = Math.floor((((timeNow - arrivedAt) % 3600000) % 60000) / 1000);

      // Retorna a diferença formatada. Ex: 08:00:00.
      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    // Calcula o tempo restante para o usuário cumprir a carga horária diária.
    user.missingHours = () => {
      const missingHours = [] as string[];
      const dateNow = new Date();

      // Formata a carga horária do usuário para o formato de data.
      Object.values(record[0].hours_bank[0].expected_hours).forEach((value) => {
        Number(value) < 10 ? missingHours.push(`0${value}`) : missingHours.push(`${value}`);
      });

      const totalWorkedHours = user.totalHours(); // Obtém propriedade totalHours do usuário.

      // Formata a carga horária cumprida pelo usuário para o formato de data.
      const workedHours = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(totalWorkedHours.split(':')[0]),
        Number(totalWorkedHours.split(':')[1]), Number(totalWorkedHours.split(':')[2])
      ).getTime();

      // Formata a carga horária esperada pelo usuário para o formato de data.
      const expectedHour = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(missingHours.join(':').split(':')[0]),
        Number(missingHours.join(':').split(':')[1]), Number(missingHours.join(':').split(':')[2])
      ).getTime();

      /*
        * Calcula a diferença entre a carga horária esperada e a carga horária cumprida.
        * O resultado é negativo, pois a carga horária esperada é maior que a carga horária cumprida.
        * Inverter a ordem dos valores causa comportamento inesperado.
        * É subtraído 1 hora e 1 minuto para que o resultado seja o tempo restante para o usuário cumprir a carga horária.
      */
      let hour = Math.floor((workedHours - expectedHour) / 3600000) * -1 - 1;
      let minute = Math.floor(((workedHours - expectedHour) % 3600000) / 60000) * -1 -1;
      let seconds = Math.floor((((workedHours - expectedHour) % 3600000) % 60000) / 1000) * -1;

      // Impede que seja retornado um valor negativo.
      hour < 0 ? hour = 0 : hour = hour;
      minute < 0 ? minute = 0 : minute = minute;
      seconds < 0 ? seconds = 0 : seconds = seconds;

      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  }

  /*
  * Processa múltiplos registros de ponto, no caso de o usuário ter registrado a entrada e a saída.
  */

  private processMultipleRecords(user: User, records: Record[]) {
    const arriveAt: string[] = [];
    const leftAt: string[] = [];
    // Define as propriedades do usuário.
    user.status = null; // Se o usuário tiver registrado a entrada e a saída, seu status é null.
    // Formata a hora de chegada do usuário. Ex: 08:00:00. O retorno da api é um array com os valores separados.
    Object.values(records[0].record_time).forEach((value) => {
      Number(value) < 10 ? arriveAt.push(`0${value}`) : arriveAt.push(`${value}`);
    });
    // Formata a hora de saída do usuário. Ex: 18:00:00. Considera sempre o último elemento do array.
    // Funcionalidade deve ser revista, pois em caso do usário registrar um intervalo, este valor será considerado como saída.
    Object.values(records[records.length - 1].record_time).forEach((value) => {
      Number(value) < 10 ? leftAt.push(`0${value}`) : leftAt.push(`${value}`);
    });
    user.arrivedAt = arriveAt.join(':');
    user.leftAt = leftAt.join(':');
    user.extraHours = '00:00:00'; // Implementar funcionalidade.
    user.missingHours = () => '00:00:00'; // Implementar funcionalidade.
    user.totalHours = () => {
      const dateNow = new Date();

      // Formata a hora de chegada do usuário para o formato de data.
      const arrivedAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.arrivedAt?.split(':')[0]),
        Number(user.arrivedAt?.split(':')[1]), Number(user.arrivedAt?.split(':')[2])
      ).getTime();

      // Formata a hora de saída do usuário para o formato de data.
      const leftAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.leftAt?.split(':')[0]),
        Number(user.leftAt?.split(':')[1]), Number(user.leftAt?.split(':')[2])
      ).getTime();

      // Calcula a diferença entre a hora de saída e a hora de chegada do usuário.
      const hour = Math.floor((leftAt - arrivedAt) / 3600000);
      const minute = Math.floor(((leftAt - arrivedAt) % 3600000) / 60000);
      const seconds = Math.floor((((leftAt - arrivedAt) % 3600000) % 60000) / 1000);

      return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  }

  openModal(user: User) {
    alert('Funcionalidade em desenvolvimento');
  }
}
