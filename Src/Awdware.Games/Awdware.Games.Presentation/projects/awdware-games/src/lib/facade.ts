import { AwdwareFacade } from 'awdware-shared';
import { GameInitService } from './games-init.service';

export const facade: AwdwareFacade = {
  initServiceName: GameInitService.name,
  test: false
};
