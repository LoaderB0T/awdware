import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushyComponent } from './pushy.component';
import { CreatePushyLobbyComponent } from './create-pushy-lobby/create-pushy-lobby.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PushyComponent, CreatePushyLobbyComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [
    CreatePushyLobbyComponent
  ]
})
export class PushyModule { }
