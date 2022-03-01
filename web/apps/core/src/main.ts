import { loadModulesForApp } from '@awdware/bootstrap';

loadModulesForApp('host').then(() => {
  import('./bootstrap').catch(err => console.error(err));
});
