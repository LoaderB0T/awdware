import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if ((window as any).__gah__env.production) {
  enableProdMode();
}

import('./app/app.module').then(appModule => {
  platformBrowserDynamic()
    .bootstrapModule(appModule.AppModule)
    .catch(err => console.error(err));
});
