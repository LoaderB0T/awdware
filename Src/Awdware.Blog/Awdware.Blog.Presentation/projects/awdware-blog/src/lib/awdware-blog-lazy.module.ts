import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from '@awdware/core';
import { FacadeService, AwdwareConfig, MenuItem } from '@awdware/shared';


export const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./awdware-blog.module').then(m => m.AwdwareBlogModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
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
