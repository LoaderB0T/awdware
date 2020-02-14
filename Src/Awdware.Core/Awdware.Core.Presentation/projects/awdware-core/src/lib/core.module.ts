import { NgModule } from '@angular/core';

import { AwdwareCoreSharedModule, FacadeService, AwdwareConfig, MenuItem, NoopInterceptorService } from 'awdware-shared';

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
    HomeModule
  ],
})
export class CoreModule {
  private _sessionStoreService: SessionStoreService;

  constructor(
    routingService: RoutingService,
    facadeService: FacadeService,
    sessionStoreService: SessionStoreService,
    httpInterceptorService: HttpInterceptorService
  ) {
    console.log('constructor: CoreModule');

    facadeService.intercept = (req, next) => httpInterceptorService.intercept(req, next);

    this._sessionStoreService = sessionStoreService;
    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('Home', 'home', () => routingService.navigateToHomeHello(), () => true),
      // new MenuItem('Vote', 'ballot', () => this._routingService.navigateToVote(), () => true),
      // new MenuItem('Short URL', 'link', () => { }, () => true),
      // new MenuItem('Game', 'gamepad', () => this._routingService.navigateToGames(), () => true),
      // new MenuItem('LED', 'lightbulb', () => this._routingService.navigateToLed(), () => true),
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
