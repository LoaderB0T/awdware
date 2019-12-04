import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushyComponent } from './pushy.component';
import { CreatePushyLobbyComponent } from './create-pushy-lobby/create-pushy-lobby.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { JoinPushyLobbyComponent } from './join-pushy-lobby/join-pushy-lobby.component';
import { LobbyComponent } from './lobby/lobby.component';



@NgModule({
  declarations: [PushyComponent, CreatePushyLobbyComponent, JoinPushyLobbyComponent, LobbyComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [
    CreatePushyLobbyComponent,
    JoinPushyLobbyComponent
  ]
})
export class PushyModule { }
