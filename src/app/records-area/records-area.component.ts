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
      "recordType": {0:"00:00", 1:"00:00"},
      "extraHours": "00:00",
      "missingHours": "00:00",
      "balance": "00:00"
    },
    {
      "status": false,
      "name": "Cristiano",
      "recordType": {0:"00:00", 1:"00:00"},
      "extraHours": "00:00",
      "missingHours": "00:00",
      "balance": "00:00"
    },
    {
      "status": null,
      "name": "Cristiano",
      "recordType": {0:"00:00", 1:"00:00"},
      "extraHours": "00:00",
      "missingHours": "00:00",
      "balance": "00:00"
    }
  ];

}
