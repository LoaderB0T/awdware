import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AwdwareCoreSharedModule, NoopInterceptorService } from 'awdware-shared';
import { ModuleResoverService } from './services/module-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AwdwareCoreSharedModule,
    RouterModule.forRoot([
      {
        path: '**',
        resolve: { modules: ModuleResoverService },
        component: AppComponent
      }
    ]),
  ],
  exports: [HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: NoopInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('Host constructor called');
  }
}


