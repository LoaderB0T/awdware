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
import { SharedModule } from '@awdware/shared';
import { ResourceMapModule } from 'ng-dynamic-mf';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    LoginHelpComponent,
    NewPasswordComponent,
    RegisterComponent,
    VerifyMailComponent
  ],
  imports: [CommonModule, SharedModule, AccountRoutingModule, FormsModule, ResourceMapModule]
})
export class AccountModule {}
