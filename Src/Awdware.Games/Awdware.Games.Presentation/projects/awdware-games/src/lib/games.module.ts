import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwdwareCoreSharedModule } from 'awdware-shared';

import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { PushyModule } from './pushy/pushy.module';
import { GameHomeComponent } from './game-home/game-home.component';


@NgModule({
  declarations: [GamesComponent, GameHomeComponent],
  imports: [
    CommonModule,
    AwdwareCoreSharedModule,
    GamesRoutingModule,
    PushyModule
  ]
})
export class GamesModule { }
