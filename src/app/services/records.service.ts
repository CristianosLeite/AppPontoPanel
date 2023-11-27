import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Record } from '../interfaces/record.interface';
import { TimeObject } from '../interfaces/hours-bank.interface';
import { ApiServices } from './api-services.service';

/**
 * @description Serviço responsável por processar os registros de ponto dos usuários.
*/
@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  date = new Date().toUTCString();
  records = [] as Record[];

  constructor(private readonly api: ApiServices) { }

  /**
  * Calcula a diferença entre dois valores de tempo e retorna uma string formatada com os valores positivos.
  */
  private calculateTimeDifference(greaterTime: number, lowerTime: number): string {
    let hours = Math.floor((greaterTime - lowerTime) / 3600000);
    let minutes = Math.floor(((greaterTime - lowerTime) % 3600000) / 60000);
    let seconds = Math.floor((((greaterTime - lowerTime) % 3600000) % 60000) / 1000);

    return this.formatTime(hours, minutes, seconds);
  }

  /**
  * @description Calcula a diferença entre dois valores de tempo e retorna uma string formatada com os valores positivos ou negativos.
  * @param {number} greaterTime Valor de tempo maior.
  * @param {number} lowerTime Valor de tempo menor.
  * @param {boolean} isNegative Indica se o retorno aceita valores negativos.
  */
  private calculateInversedTimeDifference(greaterTime: number, lowerTime: number, isNegative?: boolean): string {
    // É subtraído 1 hora e 1 minuto para que o resultado seja o tempo restante para o usuário cumprir a carga horária.
    let hours = Math.floor((lowerTime - greaterTime) / 3600000) * -1 - 1;
    let minutes = Math.floor(((lowerTime - greaterTime) % 3600000) / 60000) * -1 - 1;
    let seconds = Math.floor((((lowerTime - greaterTime) % 3600000) % 60000) / 1000) * -1 - 1;

    return this.formatTime(hours, minutes, seconds, isNegative);
  }

  /**
  * @description Formata os valores de tempo para o formato HH:MM:SS.
  * @param {number} hours Valor de horas.
  * @param {number} minutes Valor de minutos.
  * @param {number} seconds Valor de segundos.
  * @param {boolean} isNegative Indica se o retorno aceita valores negativos.
  */
  private formatTime(hours: number, minutes: number, seconds: number, isNegative: boolean = false): string {
    if (!isNegative) {
      hours < 0 ? hours = 0 : hours = hours;
      minutes < 0 ? minutes = 0 : minutes = minutes;
      seconds < 0 ? seconds = 0 : seconds = seconds;

      return `${hours < 10 ? `0${hours}` : hours
        }:${minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds
        }`;
    }

    return `${hours > 10 ? `0${hours}` : hours
      }:${minutes > 10 ? `0${minutes}` : minutes
      }:${seconds > 10 ? `0${seconds}` : seconds
      }`;
  }

  /**
  * Formata um objeto de tempo para um array de strings.
  */
  private strArray(timeObject: TimeObject): string[] {
    const timeArray: string[] = [];
    Object.values(timeObject).forEach((value) => {
      Number(value) < 10 && Number(value) >= 0 ? timeArray.push(`0${value}`) : timeArray.push(`${value}`);
    });
    return timeArray;
  }

  /**
  * Processa um único registro de ponto, no caso de o usuário ter apenas registrado a entrada.
  */
  public processSingleRecord(user: User, record: Record[]) {
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
      // Insere os valores de horas esperadas em um array.
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
        Number(missingHours.join(':').split(':')[1]), Number(missingHours.join(':').split(':')[2] + 1)
      ).getTime();

      /*
        * Calcula a diferença entre a carga horária esperada e a carga horária cumprida.
        * O resultado será positivo se a carga horária esperada for maior que a carga horária cumprida.
        * Inverter a ordem dos valores causa comportamento inesperado.
      */
      return this.calculateInversedTimeDifference(expectedHour, workedHours, false);
    };

    user.extraHours = () => {
      const dateNow = new Date();
      /**
       * @description Carga horária esperada que o usuário deve cumprir.
       * @returns {string[]} Array de strings com os valores formatados.
       */
      const missingHours = this.strArray(record[0].hours_bank[0].expected_hours);

      const totalWorkedHours = user.totalHours(); // Obtém propriedade totalHours do usuário.

      // Formata a carga horária esperada pelo usuário para o formato de data.
      const expectedHour = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(missingHours.join(':').split(':')[0]),
        Number(missingHours.join(':').split(':')[1]), Number(missingHours.join(':').split(':')[2])
      ).getTime();

      // Formata a carga horária cumprida pelo usuário para o formato de data.
      const workedHours = new Date(
        dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), Number(totalWorkedHours.split(':')[0]),
        Number(totalWorkedHours.split(':')[1]), Number(totalWorkedHours.split(':')[2])
      ).getTime();

      /*
        * Calcula a diferença entre a carga horária esperada e a carga horária cumprida.
        * O resultado será negativo se a carga horária esperada for menor que a carga horária cumprida.
        * Inverter a ordem dos valores causa comportamento inesperado.
      */
      const timeDifference: string[] = [];
      this.calculateInversedTimeDifference(expectedHour, workedHours, true).split(':').forEach((value) => {
        // Horas extras será verdade se horas faltantes for menor que 0.
        // Neste caso, o valor de horas extras será o valor inverso de horas faltantes.
        timeDifference.push(`${Number(value) < 0 ? Number(value) * -1 : 0}`);
      });

      // Formata o valor de horas extras para o formato HH:MM:SS.
      let extraHours = this.formatTime(Number(timeDifference[0]) - 1, Number(timeDifference[1]) - 1, Number(timeDifference[2]) - 1);

      totalWorkedHours === extraHours ? extraHours = '00:00:00' : extraHours = extraHours;
      // Retorna total de horas extras.
      return extraHours;
    }
  }

  /**
    * Processa múltiplos registros de ponto, no caso de o usuário ter registrado a entrada e a saída.
  */
  public processMultipleRecords(user: User, records: Record[]) {
    // Define as propriedades do usuário.
    user.status = null; // Se o usuário tiver registrado a entrada e a saída, seu status é null.
    // Formata a hora de chegada do usuário. Ex: 08:00:00. O retorno da api é um array com os valores separados.
    const arriveAt: string[] = this.strArray(records[records.length - 1].record_time);

    // Formata a hora de saída do usuário. Ex: 18:00:00. Considera sempre o último elemento do array.
    const leftAt: string[] = this.strArray(records[0].record_time);

    user.arrivedAt = arriveAt.join(':');
    user.leftAt = leftAt.join(':');
    user.extraHours = () => {
      const extraHours = this.strArray(records[records.length - 1].hours_bank[0].banked_hours);

      let hours = Number(extraHours[0]);
      let minutes = Number(extraHours[1]);
      let seconds = Number(extraHours[2]);

      // Horas extras será verdade se horas acumuladas for maior que 0.
      hours < 0 ? hours = 0 : hours = hours;
      minutes < 0 ? minutes = 0 : minutes = minutes;
      seconds < 0 ? seconds = 0 : seconds = seconds;

      return this.formatTime(hours, minutes, seconds);
    }
    user.missingHours = () => {
      const missingHours = this.strArray(records[records.length - 1].hours_bank[0].banked_hours);

      let hours = Number(missingHours[0]);
      let minutes = Number(missingHours[1]);
      let seconds = Number(missingHours[2]);

      // Horas faltantes será verdade se horas acumuladas for menor que 0.
      // Neste caso, o valor de horas faltantes será o valor inverso de horas acumuladas.
      hours > 0 ? hours = 0 : hours = hours * -1;
      minutes > 0 ? minutes = 0 : minutes = minutes * -1;
      seconds > 0 ? seconds = 0 : seconds = seconds * -1;

      return this.formatTime(hours, minutes, seconds);
    }
    user.totalHours = () => {
      const totalHours = this.strArray(records[records.length - 1].hours_bank[0].worked_hours);

      return this.formatTime(Number(totalHours[0]), Number(totalHours[1]), Number(totalHours[2]));
    };
  }

  /**
   * @description Busca todos os registros de ponto cadastrados no sistema.
  */
  async getRecords(): Promise<Record[]> {
    await this.api.getAllRecordsByDate(this.date).then((response: Record[]) => {
      this.records = response;
    });
    return this.records;
  }
}
