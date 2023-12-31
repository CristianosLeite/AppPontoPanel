import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SaibaMaisAppPontoComponent } from './pages/saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/home/admin/admin.component';
import { UserComponent } from './pages/home/user/user.component';
import { ManagerComponent } from './pages/home/manager/manager.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { FinishRegistration } from './pages/finish-registration/finish-registration';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';


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

  {
    path: 'users',
    component: UsersPageComponent,
    data: { title: 'Usuários' },
    children: [
      {
        path: 'users',
        component: UsersPageComponent,
      },
    ],
  },

  {
    path: 'registration',
    component: FinishRegistration,
    data: { title: 'Finalizar Cadastro' },
    children: [
      {
        path: 'registration',
        component: FinishRegistration,
      },
    ],
  },

  {
    path: 'edit-profile',
    component: EditProfilePageComponent,
    data: { title: 'Perfil' },
    children: [
      {
        path: 'edit-profile',
        component: EditProfilePageComponent,
      },
    ],
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'Página não encontrada' },
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
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
