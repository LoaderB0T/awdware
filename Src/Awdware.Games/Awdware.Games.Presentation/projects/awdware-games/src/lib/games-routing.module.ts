import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './games-routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
