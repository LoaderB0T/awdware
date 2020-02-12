import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AwdwareCoreSharedModule } from 'awdware-core-shared';
import { ModuleResoverService } from './services/module-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AwdwareCoreSharedModule,
    RouterModule.forRoot([
      {
        path: '**',
        resolve: { modules: ModuleResoverService },
        component: AppComponent
      }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


