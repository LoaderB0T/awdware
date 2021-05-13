import { NgModule } from '@angular/core';

import { RoutingService } from '@awdware/core';
import { FacadeService, AwdwareConfig, MenuItem } from '@awdware/shared';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'led',
    loadChildren: () => import('./led.module').then(m => m.LedModule),
    data: { activePage: 'led' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class LedLazyModule {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('constructor: LedLazyModule');
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
