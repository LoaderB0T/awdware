import { loadModulesForApp } from '@awdware/bootstrap';

loadModulesForApp().then(m => {
  import('./bootstrap').catch(err => console.error(err));
});
