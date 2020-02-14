import { AwdwareFacade } from 'awdware-shared';
import { httpInterceptorProvider } from './services/http-interceptor.service';

export const facade: AwdwareFacade = {
  baseModuleName: 'CoreModule',
  apiUrl: '',
  isEntryComponent: true,
  provider: [httpInterceptorProvider]
};
