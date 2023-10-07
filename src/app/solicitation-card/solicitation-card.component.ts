import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitation-card',
  templateUrl: './solicitation-card.component.html',
  styleUrls: ['./solicitation-card.component.scss']
})
export class SolicitationCardComponent implements OnInit {

  counter = 0;

  solicitations = [
    {
      "id": "1",
      "applicant": "Cristiano",
      "date": "03/10/2023",
      "request": "adjustment",
      "status": "pending",
      "data": {
        "id": "1",
        "Chegada": "08:00",
      }
    },
    {
      "id": "2",
      "applicant": "Cristiano",
      "date": "04/10/2023",
      "request": "adjustment",
      "status": "pending",
      "data": {
        "id": "4",
        "Saída": "18:00",
      }
    }
  ]

  constructor() { }

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
