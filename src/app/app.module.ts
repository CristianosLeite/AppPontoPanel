import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginFormComponent } from './login-page/login-form/login-form.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { AddEmailComponent } from './add-user-information/add-email/add-email.component';
import { AddAdressComponent } from './add-user-information/add-adress/add-adress.component';
import { AddPhoneComponent } from './add-user-information/add-phone/add-phone.component';
import { AddUserInformationComponent } from './add-user-information/add-user-information.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    UsersPageComponent,
    EnterprisesComponent,
    CreateUserComponent,
    AddEmailComponent,
    AddAdressComponent,
    AddPhoneComponent,
    AddUserInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CollapseModule.forRoot(),
  ],

  providers: [BsModalService, NgForm],

  bootstrap: [AppComponent]
})
export class AppModule { }
