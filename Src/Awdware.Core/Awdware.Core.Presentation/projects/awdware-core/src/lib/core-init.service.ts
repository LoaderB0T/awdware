import { Injectable } from '@angular/core';
import { MenuItem, FacadeService, AwdwareConfig } from 'awdware-shared';
import { SessionStoreService } from './services/session-store.service';
import { RoutingService } from './services/routing.service';

@Injectable({ providedIn: 'root' })
export class CoreInitService {
  private _sessionStoreService: SessionStoreService;

  constructor(routingService: RoutingService, facadeService: FacadeService, sessionStoreService: SessionStoreService) {
    console.log('CoreModule constructor called');
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
