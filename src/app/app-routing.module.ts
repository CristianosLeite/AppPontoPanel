import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SaibaMaisAppPontoComponent } from './pages/saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/home/admin/admin.component';
import { UserComponent } from './pages/home/user/user.component';
import { ManagerComponent } from './pages/home/manager/manager.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
