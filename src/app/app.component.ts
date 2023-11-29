import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ApiServices } from './services/api-services.service';
import { Router } from '@angular/router';
import { NotFoundService } from './services/not-found.service';
import { UsersService } from './services/users.service';
import { Role } from './interfaces/role.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private readonly loading: LoadingService,
    private readonly apiService: ApiServices,
    private readonly router: Router,
    private readonly notFoundService: NotFoundService,
    private readonly usersService: UsersService
  ) { }

  isLoading: boolean = false;
  role: Role | undefined = undefined;
  param: string = '';

  ngOnInit(): void {
    console.log('Seja bem vindo ao sistema de controle de ponto da Conecsa.')
    this.validateToken();
    this.loading.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
    this.notFoundService.notFoundEvent.subscribe((param: string) => {
      this.param = param;
    });
  }

  async validateToken(): Promise<void> {
    this.param = '';
      await this.apiService.validateToken().then(async () => {
      await this.usersService.getLoggedUser().then(() => {
        this.role = this.usersService.user?.role;
        this.router.navigate(['/home']);
      })
    }).catch(() => {
      console.log('Token inválido ou não encontrado.');
    });
    this.usersService.userLogged.subscribe((user: Role) => {
      this.role = user;
    });
  }
}
