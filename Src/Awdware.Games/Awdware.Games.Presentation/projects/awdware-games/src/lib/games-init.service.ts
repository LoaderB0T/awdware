import { Injectable } from '@angular/core';

import { RoutingService } from 'awdware-core';
import { FacadeService, AwdwareConfig, MenuItem } from 'awdware-shared';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('GamesModule constructor called');
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('Game', 'gamepad', () => routingService.navigateToGames(), () => true),
    ];
    facadeService.addOrUpdateConfiguration('awdware-games', config);
  }
}
