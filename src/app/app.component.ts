import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly loading: LoadingService) { }

  isLoading: boolean = false;

  ngOnInit(): void {
    this.loading.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
