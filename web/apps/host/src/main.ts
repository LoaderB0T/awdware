import { loadModulesForApp } from '@awdware/bootstrap';
import { modules } from './modules';

loadModulesForApp('host').then(m => {
  modules.push(...m);
  import('./bootstrap').catch(err => console.error(err));
});
