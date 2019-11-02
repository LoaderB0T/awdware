import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LedComponent } from './led.component';
import { LedRoutingModule } from './account-routing.module';
import { LedEffectComponent } from './led-effect/led-effect.component';
import { LedEffectPropertyComponent } from './led-effect/led-effect-property/led-effect-property.component';



@NgModule({
  declarations: [
    LedComponent,
    LedEffectComponent,
    LedEffectPropertyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LedRoutingModule
  ]
})
export class LedModule { }
