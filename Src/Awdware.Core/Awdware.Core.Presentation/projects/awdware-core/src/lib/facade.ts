import { AwdwareFacade } from 'awdware-shared';
import { BaseComponent } from './base/base.component';
import { UserDetailsService } from './services/user-details.service';
import { CoreInitService } from './core-init.service';

export const facade: AwdwareFacade = {
  initServiceName: CoreInitService.name,
  test: false,
  apiUrl: '',
  entryComponentName: BaseComponent.name,
  services: {
    export: [
      UserDetailsService.name
    ]
  }
};
