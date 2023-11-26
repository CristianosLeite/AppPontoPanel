import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { DatabaseService } from './services/database.service';
import { ApiServices } from './services/api-services.service';
import { Router } from '@angular/router';
import { NotFoundService } from './services/not-found.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor(
    private readonly loading: LoadingService,
    private readonly database: DatabaseService,
    private readonly apiService: ApiServices,
    private readonly router: Router,
    private readonly notFound: NotFoundService
  ) { }

  isLoading: boolean = false;
  role: string = '';
  param: string = '';

  ngOnInit(): void {
    console.log('Seja bem vindo ao sistema de controle de ponto da Conecsa.')
    this.validateToken().then(async (response: any) => {
      await this.database.saveUser(response.user);
      this.role = response.user.role;
    }).catch(() => {
      console.log('Necessário login.');
    });
    this.loading.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this.notFound.notFound.subscribe((param: string) => {
      this.param = param;
    });
  }

  async validateToken() {
    this.param = '';
    await this.apiService.validateToken().then(() => {
      this.router.navigate(['/home']);
    }).catch(() => {
      console.log('Token inválido ou não encontrado.');
    });
  }

  setParam(param: Event) {
    this.param = param.toString();
  }
}
