import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@awdware/shared';
import { loadedModules } from 'ng-dynamic-mf';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([]), SharedModule, loadedModules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
