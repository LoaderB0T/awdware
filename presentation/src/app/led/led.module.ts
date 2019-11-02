import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LedComponent } from './led.component';
import { LedRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [
    LedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LedRoutingModule
  ]
})
export class LedModule { }
