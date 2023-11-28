import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AddEmailComponent } from './components/add-user-information/add-email/add-email.component';
import { AddAdressComponent } from './components/add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from './components/add-user-information/add-phone/add-phone.component';
import { AddUserInformationComponent } from './components/add-user-information/add-user-information.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoginPopoverComponent } from './components/login-popover/login-popover.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { SaibaMaisAppPontoComponent } from './pages/saiba-mais-app-ponto/saiba-mais-app-ponto.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/home/admin/admin.component';
import { UserComponent } from './pages/home/user/user.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PendingCardComponent } from './components/pending-card/pending-card.component';
import { VacationCardComponent } from './components/vacation-card/vacation-card.component';
import { RecordsAreaComponent } from './components/records-area/records-area.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ManagerComponent } from './pages/home/manager/manager.component';
import { SolicitationCardComponent } from './components/solicitation-card/solicitation-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { PendingsPageComponent } from './pages/pendings-page/pendings-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UsersComponentComponent } from './components/users-component/users-component.component';
import { FilterTagsComponent } from './components/filter-tags/filter-tags.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { FinishRegistration } from './pages/finish-registration/finish-registration';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditProfilePageComponent } from './pages/edit-profile-page/edit-profile-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ModalBodyComponent } from './components/user-profile/modal-body/modal-body.component';

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
    UsersComponentComponent,
    FilterTagsComponent,
    ToolBarComponent,
    ActionsBarComponent,
    FinishRegistration,
    LoadingComponent,
    NotFoundComponent,
    EditProfilePageComponent,
    UserProfileComponent,
    ModalBodyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
  ],

  providers: [BsModalService, NgForm, BsDropdownDirective],

  bootstrap: [AppComponent]
})
export class AppModule { }
