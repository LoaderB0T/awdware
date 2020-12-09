import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedComponent } from './led.component';
import { AuthGuard } from '@awdware/core';

export const routes: Routes = [
  {
    path: '',
    component: LedComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedRoutingModule { }
