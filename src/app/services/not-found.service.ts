import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotFoundService {
  @Output() notFound = new EventEmitter<string>();

  constructor() { }
}
