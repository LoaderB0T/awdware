import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@awdware/shared';
import { modules } from '../modules';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([]), SharedModule, modules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
