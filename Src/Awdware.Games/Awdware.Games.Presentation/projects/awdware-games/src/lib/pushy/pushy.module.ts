import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AwdwareCoreSharedModule } from 'awdware-shared';

import { PushyComponent } from './pushy.component';
import { CreatePushyLobbyComponent } from './create-pushy-lobby/create-pushy-lobby.component';
import { JoinPushyLobbyComponent } from './join-pushy-lobby/join-pushy-lobby.component';
import { LobbyComponent } from './lobby/lobby.component';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    PushyComponent,
    CreatePushyLobbyComponent,
    JoinPushyLobbyComponent,
    LobbyComponent,
    FieldComponent
  ],
  imports: [
    CommonModule,
    AwdwareCoreSharedModule,
    FormsModule
  ],
  entryComponents: [
    CreatePushyLobbyComponent,
    JoinPushyLobbyComponent
  ]
})
export class PushyModule { }
