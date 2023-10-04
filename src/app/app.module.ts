import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UsersPageComponent } from './users-page/users-page.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AddEmailComponent } from './add-user-information/add-email/add-email.component';
import { AddAdressComponent } from './add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from './add-user-information/add-phone/add-phone.component';
import { AddUserInformationComponent } from './add-user-information/add-user-information.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoginPopoverComponent } from './login-popover/login-popover.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { LoginCardComponent } from './login-card/login-card.component';
import { SaibaMaisAppPontoComponent } from './saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './home/admin/admin.component';
import { UserComponent } from './home/user/user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PendingCardComponent } from './pending-card/pending-card.component';
import { VacationCardComponent } from './vacation-card/vacation-card.component';
import { RecordsAreaComponent } from './records-area/records-area.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ManagerComponent } from './home/manager/manager.component';
import { SolicitationCardComponent } from './solicitation-card/solicitation-card.component';
import { FooterComponent } from './footer/footer.component';
import { PendingsPageComponent } from './pendings-page/pendings-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersPageComponent,
    EnterprisesComponent,
    CreateUserComponent,
    AddEmailComponent,
    AddAdressComponent,
    AddPhoneComponent,
    AddUserInformationComponent,
    NavBarComponent,
    LoginPopoverComponent,
    LoginCardComponent,
    SaibaMaisAppPontoComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginPageComponent,
    PendingCardComponent,
    VacationCardComponent,
    RecordsAreaComponent,
    SidebarComponent,
    HeaderComponent,
    ManagerComponent,
    SolicitationCardComponent,
    FooterComponent,
    PendingsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
  ],

  providers: [BsModalService, NgForm],

  bootstrap: [AppComponent]
})
export class AppModule { }
