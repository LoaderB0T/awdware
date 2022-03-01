import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  SharedModule,
  FacadeService,
  ThemeService,
  TranslationService,
  AwdwareConfig,
  MenuItem,
  RoutingService
} from '@awdware/shared';

import { MenuComponent } from './menu/menu.component';
import { MeComponent } from './me/me.component';
import { CoreRoutingModule } from './core-routing.module';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { BaseComponent } from './base/base.component';
import { CommonModule } from '@angular/common';
import { ErrorModule } from './error/error.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingsModule } from './settings/settings.module';
import { HttpInterceptorService, SessionStoreService } from '@awdware/session';
import { environment, envValidator } from './environment';

@NgModule({
  declarations: [MenuComponent, MeComponent, BaseComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot({ apiUrl: environment.apiUrl }),
    AccountModule,
    HomeModule,
    ErrorModule,
    SettingsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }]
})
export class CoreModule {
  private readonly _sessionStoreService: SessionStoreService;

  constructor(
    routingService: RoutingService,
    facadeService: FacadeService,
    sessionStoreService: SessionStoreService,
    themeService: ThemeService,
    translationService: TranslationService
  ) {
    console.log('constructor: CoreModule');
    envValidator();

    translationService.init();
    themeService.init();

    this._sessionStoreService = sessionStoreService;
    const config = {} as AwdwareConfig;
    config.menuItems = [
      new MenuItem(
        'home',
        'Home',
        'home',
        0,
        () => routingService.navigateToHomeHello(),
        () => true
      ),
      new MenuItem(
        'login',
        'Login',
        'arrow-right-to-bracket',
        100,
        () => routingService.navigateToAccountLogin(),
        () => this.showLoginButton()
      ),
      new MenuItem(
        'me',
        'Me',
        'user',
        100,
        () => routingService.navigateToAccountMe(),
        () => this.showAccountButton()
      ),
      new MenuItem(
        'settings',
        'Settings',
        'gear',
        200,
        () => routingService.navigateToSettings(),
        () => true
      )
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
