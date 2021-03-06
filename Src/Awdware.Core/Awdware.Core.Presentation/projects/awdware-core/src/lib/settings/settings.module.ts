import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

import { AwdwareCoreSharedModule } from '@awdware/shared';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, AwdwareCoreSharedModule]
})
export class SettingsModule {}
