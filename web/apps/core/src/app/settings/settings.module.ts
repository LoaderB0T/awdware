import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

import { SharedModule } from '@awdware/shared';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SharedModule]
})
export class SettingsModule {}
