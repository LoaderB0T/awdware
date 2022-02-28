import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from '../core-routes';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreModule, RouterModule.forChild(routes)],
  providers: []
})
export class RemoteEntryModule {}
