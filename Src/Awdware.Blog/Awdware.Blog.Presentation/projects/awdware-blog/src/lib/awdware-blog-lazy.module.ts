import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from '@awdware/core';
import { FacadeService, AwdwareConfig, MenuItem } from '@awdware/shared';

export const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./awdware-blog.module').then(m => m.AwdwareBlogModule),
    data: { activePage: 'blog' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AwdwareLazyBlogModule {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('constructor: AwdwareBlogLazyModule');
    const config = {} as AwdwareConfig;
    config.menuItems = [
      new MenuItem(
        'blog',
        'Blog',
        'code',
        80,
        () => routingService.navigate('blog'),
        () => true
      )
    ];
    facadeService.addOrUpdateConfiguration('awdware-blog', config);
  }
}
