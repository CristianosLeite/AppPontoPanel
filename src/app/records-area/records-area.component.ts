import { Component } from '@angular/core';

@Component({
  selector: 'app-records-area',
  templateUrl: './records-area.component.html',
  styleUrls: ['./records-area.component.scss']
})
export class RecordsAreaComponent {

  records = [
    {
      "status": true,
      "name": "Cristiano",
      "recordType": "Entrada",
      "extraHours": "00:00",
      "missingHours": "00:00",
    },
    {
      "status": false,
      "name": "Cristiano",
      "recordType": "Entrada",
      "extraHours": "00:00",
      "missingHours": "00:00",
    }
  ];

}
