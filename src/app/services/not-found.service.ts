import { Injectable, Output, EventEmitter } from '@angular/core';

/**
 * Serviço para emitir o evento de not found
 */
@Injectable({
  providedIn: 'root'
})
export class NotFoundService {
  /**
   * Evento de not found
   */
  @Output() notFound = new EventEmitter<string>();

}
