import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AwdwareCoreSharedModule } from '@gah/Awdware.Shared.Presentation';

import { LedComponent } from './led.component';
import { LedRoutingModule } from './led-routing.module';
import { LedEffectComponent } from './led-effect/led-effect.component';
import { LedEffectPropertyComponent } from './led-effect/led-effect-property/led-effect-property.component';
import { LedSettingsComponent } from './led-settings/led-settings.component';
import { LedSettingComponent } from './led-settings/led-setting/led-setting.component';
import { AddEffectComponent } from './add-effect/add-effect.component';



@NgModule({
  declarations: [
    LedComponent,
    LedEffectComponent,
    LedEffectPropertyComponent,
    LedSettingsComponent,
    LedSettingComponent,
    AddEffectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AwdwareCoreSharedModule,
    LedRoutingModule
  ],
  entryComponents: [
    LedSettingsComponent,
    AddEffectComponent
  ]
})
export class LedModule {
  constructor() {
    console.log('constructor: LedModule');
  }
}
