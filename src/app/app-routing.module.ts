import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'saiba-mais',
    component: AppComponent,
    data: { title: 'Saiba Mais' },
    children: [
      {
        path: 'saiba-mais',
        component: SaibaMaisAppPontoComponent,
      },
    ]
  },
  {
    path: '#/home',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
