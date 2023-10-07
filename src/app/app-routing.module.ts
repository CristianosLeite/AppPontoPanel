import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './home/admin/admin.component';
import { UserComponent } from './home/user/user.component';
import { ManagerComponent } from './home/manager/manager.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    data: { title: 'App Ponto - Conecsa' },
    children: [
      {
        path: 'saiba-mais',
        component: SaibaMaisAppPontoComponent,
      },
    ],
  },

  {
    path: 'login',
    redirectTo: 'http://localhost:3000/api/login/',
  },

  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    children: [
      {
        path: 'home/admin',
        component: AdminComponent,
      },
      {
        path: 'home/user',
        component: UserComponent,
      },
      {
        path: 'home/manager',
        component: ManagerComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true, preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
