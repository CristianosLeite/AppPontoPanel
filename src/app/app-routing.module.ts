import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './home/admin/admin.component';
import { UserComponent } from './home/user/user.component';
import { ManangerComponent } from './home/mananger/mananger.component';
import { LoginPageComponent } from './login-page/login-page.component'

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
        path: 'home/mananger',
        component: ManangerComponent,
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
