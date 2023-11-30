import { Injectable, Input, Output, EventEmitter } from '@angular/core';

/**
 * @description Serviço responsável por emitir mensagens para os componentes.
*/
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /**
   * @description Evento que emite mensagem para os componentes.
   * @type {EventEmitter<string>}
   * @default ''
  */
  @Output() message: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @description Evento que recebe mensagem para os componentes.
   * @type {string}
   * @default ''
  */
  @Input() messageReceived: string = '';

  /**
   * @description Emite mensagem para os componentes.
   * @param {string} message Mensagem a ser emitida.
  */
  setMessage(message: string) {
    this.messageReceived = message;
    setTimeout(() => {
      this.message.emit(this.messageReceived);
    }, 300);
  }
}
