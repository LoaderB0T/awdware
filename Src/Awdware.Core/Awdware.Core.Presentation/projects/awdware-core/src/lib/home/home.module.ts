import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { AwdwareCoreSharedModule } from '@gah/Awdware.Shared.Presentation/public-api';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AwdwareCoreSharedModule
  ]
})
export class HomeModule { }
