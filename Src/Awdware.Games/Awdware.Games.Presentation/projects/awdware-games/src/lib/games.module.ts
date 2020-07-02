import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwdwareCoreSharedModule, FacadeService, AwdwareConfig, MenuItem } from '@awdware/awdware-shared';

import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { PushyModule } from './pushy/pushy.module';
import { GameHomeComponent } from './game-home/game-home.component';
import { RoutingService } from '@awdware/awdware-core';


@NgModule({
  declarations: [GamesComponent, GameHomeComponent],
  imports: [
    CommonModule,
    AwdwareCoreSharedModule,
    GamesRoutingModule,
    PushyModule
  ]
})
export class GamesModule {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('constructor: GamesModule');
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('Game', 'gamepad', () => routingService.navigateToGames(), () => true),
    ];
    facadeService.addOrUpdateConfiguration('awdware-games', config);
  }
}
