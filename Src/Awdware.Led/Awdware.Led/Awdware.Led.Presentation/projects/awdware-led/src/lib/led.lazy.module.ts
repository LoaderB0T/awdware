// @dynamic

import { NgModule } from '@angular/core';

import { RoutingService } from '@awdware/awdware-core';
import { FacadeService, AwdwareConfig, MenuItem } from '@awdware/awdware-shared';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'led',
    loadChildren: () => import('./led.module').then(m => m.LedModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LedLazyModule {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('constructor: LedLazyModule');
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('LED', 'lightbulb', () => routingService.navigateToLed(), () => true),
    ];
    facadeService.addOrUpdateConfiguration('awdware-led', config);
  }
}
