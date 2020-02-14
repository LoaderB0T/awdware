import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginHelpComponent } from './account/login-help/login-help.component';
import { VerifyMailComponent } from './account/verify-mail/verify-mail.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';
import { MeComponent } from './me/me.component';
import { UserDetailsResolverService } from './account/services/user-info-resolver.service';
import { AuthGuard } from './services/auth.guard';
import { BaseComponent } from './base/base.component';


export const routes: Routes = [
  {
    path: '',
    resolve: { userInfo: UserDetailsResolverService },
    component: BaseComponent,
    children: [
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
        path: 'me',
        component: MeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'hello',
        component: HomeComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hello'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
