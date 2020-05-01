import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router';
import { ModuleInitializerService } from './services/module-initializer.service';
import { gahModules } from './.gah-generated/gah-modules';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    gahModules
  ],
  exports: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    router.resetConfig(
      [
        {
          path: '**',
          resolve: { awd: ModuleInitializerService },
          component: AppComponent
        }
      ]
    );
  }
}
