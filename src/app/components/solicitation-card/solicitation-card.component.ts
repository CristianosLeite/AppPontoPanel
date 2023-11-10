import { Component, OnInit } from '@angular/core';
import { Solicitation } from 'src/app/interfaces/solicitations.interface';
import { ApiServices } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-solicitation-card',
  templateUrl: './solicitation-card.component.html',
  styleUrls: ['./solicitation-card.component.scss']
})
export class SolicitationCardComponent implements OnInit {

  counter = 0;

  solicitations = [] as Solicitation[];

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
