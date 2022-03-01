import { loadModulesForApp } from '@awdware/bootstrap';

loadModulesForApp('led').then(() => {
  import('./bootstrap').catch(err => console.error(err));
});
