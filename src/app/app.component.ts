import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly loading: LoadingService,
    private readonly database: DatabaseService,
  ) { }

  isLoading: boolean = false;
  role: string = '';
  param: string = '';

  ngOnInit(): void {
    this.loading.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    console.log('Seja bem vindo ao sistema de controle de ponto da Conecsa.')
    this.database.getUser().then((user: any) => {
      this.role = user.role;
    }).catch(() => {
      console.log('Necessário login para continuar.');
    });
  }

  setParam(param: string) {
    this.param = param;
  }
}
