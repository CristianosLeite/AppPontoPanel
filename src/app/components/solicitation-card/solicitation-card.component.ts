import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-solicitation-card',
  templateUrl: './solicitation-card.component.html',
  styleUrls: ['./solicitation-card.component.scss']
})
export class SolicitationCardComponent implements OnInit {

  counter = 0;

  solicitations = []

  constructor(private readonly api: ApiServices) { }

  ngOnInit(): void {
    this.checkForSolicitations();
  }

  checkForSolicitations() {
    this.counter = 0;
    this.solicitations.forEach(solicitation => {
      if (solicitation.status === 'pending') {
        this.counter++;
      }
    });
  }
}
