import { loadModulesForApp } from '@awdware/bootstrap';

loadModulesForApp().then(() => {
  import('./bootstrap').catch(err => console.error(err));
});
