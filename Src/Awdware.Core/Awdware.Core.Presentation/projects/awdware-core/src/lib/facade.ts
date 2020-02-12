import { AwdwareFacade } from 'awdware-core-shared';
import { BaseComponent } from './base/base.component';

export const facade: AwdwareFacade = {
  test: false,
  apiUrl: '',
  entryComponentName: BaseComponent.name
};
