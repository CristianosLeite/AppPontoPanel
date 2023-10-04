import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-card',
  templateUrl: './pending-card.component.html',
  styleUrls: ['./pending-card.component.scss']
})
export class PendingCardComponent implements OnInit {

  counter = 0;

  pendings = [
    {
      "id": "1",
      "applicant": "Flávia",
      "date": "04/10/2023",
      "request": "signature",
      "status": "pending",
      "data": {
        "employee": "Cristiano",
        "message": "Pendente asssinatura de folha de ponto"
      }
    },

    {
      "id": "2",
      "applicant": "Flávia",
      "date": "04/09/2023",
      "request": "signature",
      "status": "done",
      "data": {
        "employee": "Cristiano",
        "message": "Pendente asssinatura de folha de ponto"
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.checkForPendings();
  }

  checkForPendings() {
    this.counter = 0;
    this.pendings.forEach(pending => {
      if (pending.status === 'pending') {
        this.counter++;
      }
    });
  }
}
