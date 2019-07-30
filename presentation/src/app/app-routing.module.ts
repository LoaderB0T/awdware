import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginHelpComponent } from './account/login-help/login-help.component';
import { VerifyMailComponent } from './account/verify-mail/verify-mail.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'help',
        component: LoginHelpComponent
      },
      {
        path: 'verify/:token',
        component: VerifyMailComponent
      },
      {
        path: 'resetpw/:token',
        component: NewPasswordComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/account/login'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
