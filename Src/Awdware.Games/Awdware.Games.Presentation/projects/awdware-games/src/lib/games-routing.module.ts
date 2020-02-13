import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsResolverService } from 'awdware-core';

import { GamesComponent } from './games.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { LobbyComponent } from './pushy/lobby/lobby.component';
import { PushyLobbyResolverService } from './pushy/services/lobby-resolver.service';
import { FieldComponent } from './pushy/field/field.component';
import { PushyComponent } from './pushy/pushy.component';


export const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent,
    resolve: {
      userInfo: UserDetailsResolverService
    },
    children: [
      {
        path: 'home',
        component: GameHomeComponent
      },
      {
        path: 'pushy',
        children: [
          {
            path: 'lobby/:lobbyId',
            component: LobbyComponent,
            resolve:
            {
              lobbyInfo: PushyLobbyResolverService
            }
          },
          {
            path: 'field/:lobbyId',
            component: FieldComponent,
            resolve:
            {
              lobbyInfo: PushyLobbyResolverService
            }
          },
          {
            path: '',
            component: PushyComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
