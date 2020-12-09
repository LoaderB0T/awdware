import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginHelpComponent } from './login-help/login-help.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { AwdwareCoreSharedModule } from '@awdware/shared';


@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    LoginHelpComponent,
    NewPasswordComponent,
    RegisterComponent,
    VerifyMailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AwdwareCoreSharedModule,
    FormsModule
  ]
})
export class AccountModule { }
