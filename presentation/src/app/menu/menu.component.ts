import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { RoutingService } from '../services/routing.service';
import { SessionStoreService } from '../services/session-store.service';

@Component({
  selector: 'awd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private _routingService: RoutingService;
  private _sessionStoreService: SessionStoreService;
  private _menuItems: MenuItem[];

  @Input()
  public hideToTop: boolean;

  public opened: boolean = false;

  constructor(routingService: RoutingService, sessionStoreService: SessionStoreService) {
    this._routingService = routingService;
    this._sessionStoreService = sessionStoreService;
    this._menuItems = [
      new MenuItem('Home', 'home', () => this._routingService.navigateToHomeHello(), () => true),
      new MenuItem('Vote', 'ballot', () => this._routingService.navigateToVote(), () => true),
      new MenuItem('Short URL', 'link', () => { }, () => true),
      new MenuItem('Game', 'gamepad', () => this._routingService.navigateToGames(), () => true),
      new MenuItem('LED', 'lightbulb', () => this._routingService.navigateToLed(), () => true),
      new MenuItem('Login', 'sign-in', () => this._routingService.navigateToAccountLogin(), () => this.showLoginButton()),
      new MenuItem('Account', 'user', () => this._routingService.navigateToAccount(), () => this.showAccountButton())
    ];
  }

  ngOnInit() {
  }

  public get enabledMenuItems(): MenuItem[] {
    return this._menuItems.filter(x => x.enabled());
  }

  private showLoginButton(): boolean {
    return !this._sessionStoreService.hasToken;
  }

  private showAccountButton(): boolean {
    return this._sessionStoreService.hasToken;
  }

  public toggleMenu() {
    this.opened = !this.opened;
  }

  public itemClicked(item: MenuItem) {
    if (this.opened) {
      this.toggleMenu();
    }
    item.action();
  }

}
