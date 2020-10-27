import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RoutingService } from '@awdware/awdware-core';
import { FacadeService, AwdwareConfig, MenuItem } from '@awdware/awdware-shared';


export const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./awdware-blog.module').then(m => m.AwdwareBlogModule)
  }
]

@NgModule({
  imports: [
  ]
})
export class AwdwareLazyBlogModule {
  constructor(routingService: RoutingService, facadeService: FacadeService) {
    console.log('constructor: AwdwareBlogLazyModule');
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('blog', 'Blog', 'code', () => routingService.navigate('blog'), () => true),
    ];
    facadeService.addOrUpdateConfiguration('awdware-blog', config);
  }

}