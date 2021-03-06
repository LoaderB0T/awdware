import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { AwdwareCoreSharedModule } from '@awdware/shared';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AwdwareCoreSharedModule]
})
export class HomeModule {}
