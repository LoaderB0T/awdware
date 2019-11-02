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
import { UserInfoResolverService } from './account/services/user-info-resolver.service';
import { VoteComponent } from './vote/vote.component';
import { MyVotesComponent } from './vote/my-votes/my-votes.component';
import { NewVoteComponent } from './vote/new-vote/new-vote.component';
import { LedComponent } from './led/led.component';


const routes: Routes = [
  {
    path: '',
    resolve: { userInfo: UserInfoResolverService },
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
        component: MeComponent
      },
      {
        path: 'vote',
        component: VoteComponent,
        children: [
          {
            path: 'my',
            component: MyVotesComponent
          },
          {
            path: 'new',
            component: NewVoteComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'my'
          }
        ]
      },
      {
        path: 'led',
        component: LedComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
