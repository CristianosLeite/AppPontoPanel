import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiServices } from '../../services/api-services.service';
import { Record } from '../../interafaces/record.interface';
import { User } from '../../interafaces/user.interface';
import { interval, Subscription } from 'rxjs';
import { TimeObject } from '../../interafaces/hours-bank.interface';


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
  * Calcula a diferença entre dois valores de tempo e retorna uma string formatada com os valores positivos.
  */
  private calculateTimeDifference(greaterTime: number, lowerTime: number): string {
    let hour = Math.floor((greaterTime - lowerTime) / 3600000);
    let minute = Math.floor(((greaterTime - lowerTime) % 3600000) / 60000);
    let seconds = Math.floor((((greaterTime - lowerTime) % 3600000) % 60000) / 1000);

    return this.formatTime(hour, minute, seconds);
  }

  /*
  * Calcula a diferença entre dois valores de tempo e retorna uma string formatada com os valores positivos ou negativos.
  */
  private calculateInversedTimeDifference(greaterTime: number, lowerTime: number,  isNegative?: boolean): string {
    let hour = Math.floor((lowerTime - greaterTime) / 3600000) * -1 - 1;
    let minute = Math.floor(((lowerTime - greaterTime) % 3600000) / 60000) * -1 - 1;
    let seconds = Math.floor((((lowerTime - greaterTime) % 3600000) % 60000) / 1000) * -1;

    return this.formatTime(hour, minute, seconds, isNegative);
  }

  /*
  * Formata os valores de tempo para o formato HH:MM:SS.
  */
  private formatTime(hours: number, minutes: number, seconds: number, isNegative: boolean = true): string {
    if (!isNegative) {
      hours < 0 ? hours = 0 : hours = hours;
      minutes < 0 ? minutes = 0 : minutes = minutes;
      seconds < 0 ? seconds = 0 : seconds = seconds;
    }

    return `${hours < 10 ? `0${hours}` : hours
      }:${minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds
      }`;
  }

  /*
  * Formata um objeto de tempo para um array de strings.
  */
  private strArray(timeObject: TimeObject): string[] {
    const timeArray: string[] = [];
    Object.values(timeObject).forEach((value) => {
      Number(value) < 10 ? timeArray.push(`0${value}`) : timeArray.push(`${value}`);
    });
    return timeArray;
  }

  /*
  * Processa um único registro de ponto, no caso de o usuário ter apenas registrado a entrada.
  */
  private processSingleRecord(user: User, record: Record[]) {
    // Define as propriedades do usuário.
    user.status = true; // Se o usuário tiver registrado a entrada, seu status é true.

    // Formata a hora de chegada do usuário. Ex: 08:00:00. O retorno da api é um array com os valores separados.
    const arriveAt: string[] = this.strArray(record[0].record_time);

    user.arrivedAt = arriveAt.join(':'); // Informação que será exibida na tabela.
    user.leftAt = 'Sem registro'; // Caso o usuário tenha apenas um registro assume-se que ele não registrou a saída.
    user.totalHours = () => {
      const dateNow = new Date();
      const timeNow = Date.now();
      // Formata a hora de chegada do usuário para o formato de data.
      const arrivedAt = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(user.arrivedAt?.split(':')[0]),
        Number(user.arrivedAt?.split(':')[1]), Number(user.arrivedAt?.split(':')[2])
      ).getTime();

      // Calcula a diferença entre a hora atual e a hora de chegada do usuário.
      return this.calculateTimeDifference(timeNow, arrivedAt);
    };
    // Calcula o tempo restante para o usuário cumprir a carga horária diária.
    user.missingHours = () => {
      const dateNow = new Date();

      // Insere os valores formatados em um array de strings.
      const missingHours = this.strArray(record[0].hours_bank[0].expected_hours);

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
      return this.calculateInversedTimeDifference(expectedHour, workedHours, false);
    };

    user.extraHours = () => {
      const dateNow = new Date();

      // Insere os valores formatados em um array de strings.
      const missingHours = this.strArray(record[0].hours_bank[0].expected_hours);

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
      // Horas extras será verdade se horas faltantes for menor que 0.
      const timeDifference = this.calculateInversedTimeDifference(expectedHour, workedHours, true);

      const timeNow = Date.now();

      const extraHours = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(timeDifference.split(':')[0]),
        Number(timeDifference.split(':')[1]), Number(timeDifference.split(':')[2])
      ).getTime();

      return this.calculateInversedTimeDifference(extraHours, timeNow, false);
    };
  }

  /*
  * Processa múltiplos registros de ponto, no caso de o usuário ter registrado a entrada e a saída.
  */
  private processMultipleRecords(user: User, records: Record[]) {
    // Define as propriedades do usuário.
    user.status = null; // Se o usuário tiver registrado a entrada e a saída, seu status é null.
    // Formata a hora de chegada do usuário. Ex: 08:00:00. O retorno da api é um array com os valores separados.
    const arriveAt: string[] = this.strArray(records[0].record_time);

    // Formata a hora de saída do usuário. Ex: 18:00:00. Considera sempre o último elemento do array.
    // Funcionalidade deve ser revista, pois em caso do usário registrar um intervalo, este valor será considerado como saída.
    const leftAt: string[] = this.strArray(records[records.length - 1].record_time);

    user.arrivedAt = arriveAt.join(':');
    user.leftAt = leftAt.join(':');
    user.extraHours = () => '00:00:00'; // Implementar funcionalidade.
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
      return this.calculateTimeDifference(leftAt, arrivedAt);
    };
  }

  openModal(user: User) {
    alert('Funcionalidade em desenvolvimento');
  }
}
