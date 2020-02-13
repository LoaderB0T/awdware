import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AwdwareCoreSharedModule } from 'awdware-shared';

import { MenuComponent } from './menu/menu.component';
import { MeComponent } from './me/me.component';
import { CoreRoutingModule } from './core-routing.module';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    MenuComponent,
    MeComponent,
    BaseComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CoreRoutingModule,
    AwdwareCoreSharedModule,
    AccountModule,
    HomeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }]
})
export class CoreModule { }
