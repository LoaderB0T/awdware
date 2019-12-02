import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
