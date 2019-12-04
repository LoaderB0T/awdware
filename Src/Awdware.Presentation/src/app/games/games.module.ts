import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PushyModule } from './pushy/pushy.module';
import { GameHomeComponent } from './game-home/game-home.component';

@NgModule({
  declarations: [GamesComponent, GameHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule,
    PushyModule
  ]
})
export class GamesModule { }
