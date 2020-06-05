import { NgModule } from '@angular/core';

import {
  AwdwareCoreSharedModule, FacadeService, WebApiService,
  ThemeService, TranslationService, AwdwareConfig, MenuItem
} from '@gah/Awdware.Shared.Presentation/public-api';

import { MenuComponent } from './menu/menu.component';
import { MeComponent } from './me/me.component';
import { CoreRoutingModule } from './core-routing.module';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { BaseComponent } from './base/base.component';
import { CommonModule } from '@angular/common';
import { SessionStoreService } from './services/session-store.service';
import { RoutingService } from './services/routing.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ErrorModule } from './error/error.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environment';

@NgModule({
  declarations: [
    MenuComponent,
    MeComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AwdwareCoreSharedModule,
    AccountModule,
    HomeModule,
    ErrorModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
})
export class CoreModule {
  private _sessionStoreService: SessionStoreService;

  constructor(
    routingService: RoutingService,
    facadeService: FacadeService,
    sessionStoreService: SessionStoreService,
    apiService: WebApiService,
    themeService: ThemeService,
    translationService: TranslationService,
  ) {
    console.log('constructor: CoreModule');

    // apiService.init(environment.apiUrl);
    // TODO add event hook for after initialization is done (Environment is not available at this point in time!)
    translationService.init();
    themeService.init();

    this._sessionStoreService = sessionStoreService;
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('Home', 'home', () => routingService.navigateToHomeHello(), () => true),
      new MenuItem('Login', 'sign-in', () => routingService.navigateToAccountLogin(), () => this.showLoginButton()),
      new MenuItem('Account', 'user', () => routingService.navigateToAccount(), () => this.showAccountButton())
    ];
    facadeService.addOrUpdateConfiguration('awdware-core', config);
  }

  private showLoginButton(): boolean {
    return !this._sessionStoreService.hasToken;
  }

  private showAccountButton(): boolean {
    return this._sessionStoreService.hasToken;
  }
}
