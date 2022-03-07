import { NgModule } from '@angular/core';

import { FacadeService, AwdwareConfig, MenuItem, RoutingService } from '@awdware/shared';
import { Routes, RouterModule, Route } from '@angular/router';
import { RouterEntryService } from 'ng-dynamic-mf';

export const routes: Routes = [
  {
    path: 'led',
    loadChildren: () => import('./led.module').then(m => m.LedModule),
    data: { activePage: 'led' }
  }
];

@NgModule({
  imports: [RouterModule]
})
export class LedLazyModule {
  constructor(routingService: RoutingService, facadeService: FacadeService, routerEntryService: RouterEntryService) {
    routerEntryService.registerRoutes(routes);
    const config = {} as AwdwareConfig;
    config.menuItems = [
      new MenuItem(
        'led',
        'LED',
        'lightbulb',
        85,
        () => routingService.navigate('led'),
        () => true
      )
    ];
    facadeService.addOrUpdateConfiguration('awdware-led', config);
  }
}
