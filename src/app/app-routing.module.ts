import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto/saiba-mais-app-ponto.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
