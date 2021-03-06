import { Routes } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { UserDetailsResolverService } from './account/services/user-info-resolver.service';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginHelpComponent } from './account/login-help/login-help.component';
import { VerifyMailComponent } from './account/verify-mail/verify-mail.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';
import { MeComponent } from './me/me.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  {
    path: '',
    resolve: { userInfo: UserDetailsResolverService },
    component: BaseComponent,
    children: [
      {
        path: 'gah-outlet',
        redirectTo: '/'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hello'
      },
      {
        path: '',
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
            path: 'hello',
            component: HomeComponent
          }
        ]
      },
      {
        path: 'error/:error',
        component: ErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'hello'
  }
];
