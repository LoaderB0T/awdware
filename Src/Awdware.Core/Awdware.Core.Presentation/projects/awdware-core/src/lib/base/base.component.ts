import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { MenuItem, AwdwareConfig, FacadeService, ThemeService, TranslationService, DialogService } from 'awdware-core-shared';
import { RoutingService } from '../services/routing.service';
import { SessionStoreService } from '../services/session-store.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  private _facadeService: FacadeService;
  private _routingService: RoutingService;
  private _sessionStoreService: SessionStoreService;
  private _themeService: ThemeService;
  private _translationService: TranslationService;
  private _dialogService: DialogService;
  private previousScroll: number;
  public hideMenu: boolean = false;

  @ViewChild('mainContent', { static: true }) private _mainContent: ElementRef<HTMLDivElement>;


  constructor(
    viewContainerRef: ViewContainerRef,
    router: Router,
    facadeService: FacadeService,
    routingService: RoutingService,
    sessionStoreService: SessionStoreService,
    themeService: ThemeService,
    translationService: TranslationService,
    dialogService: DialogService
  ) {
    this._facadeService = facadeService;
    this._routingService = routingService;
    this._sessionStoreService = sessionStoreService;
    this._themeService = themeService;
    this._translationService = translationService;
    this._dialogService = dialogService;

    this._translationService.init();
    this._themeService.init();
    this._dialogService.setRootViewContainerRef(viewContainerRef);
    router.events
      .pipe(
        filter(
          (event: NavigationStart) => {
            return (event instanceof NavigationStart);
          }
        )
      )
      .subscribe(
        () => {
          this._dialogService.hideAllDialogs();
        }
      );
  }

  ngOnInit(): void {
    this.previousScroll = this._mainContent.nativeElement.scrollTop;

    const config = new AwdwareConfig();
    config.menuItems = [
      new MenuItem('Home', 'home', () => this._routingService.navigateToHomeHello(), () => true),
      // new MenuItem('Vote', 'ballot', () => this._routingService.navigateToVote(), () => true),
      // new MenuItem('Short URL', 'link', () => { }, () => true),
      // new MenuItem('Game', 'gamepad', () => this._routingService.navigateToGames(), () => true),
      // new MenuItem('LED', 'lightbulb', () => this._routingService.navigateToLed(), () => true),
      new MenuItem('Login', 'sign-in', () => this._routingService.navigateToAccountLogin(), () => this.showLoginButton()),
      new MenuItem('Account', 'user', () => this._routingService.navigateToAccount(), () => this.showAccountButton())
    ];
    this._facadeService.addOrUpdateConfiguration('awdware-core', config);
  }

  private showLoginButton(): boolean {
    return !this._sessionStoreService.hasToken;
  }

  private showAccountButton(): boolean {
    return this._sessionStoreService.hasToken;
  }


  public get dialogVisible() {
    return this._dialogService.dialogVisible;
  }

  public handleScroll() {
    const newScrollTop = this._mainContent.nativeElement.scrollTop;
    if (newScrollTop === 0) {
      this.hideMenu = false;
    } else if (this.previousScroll < newScrollTop) {
      this.hideMenu = true;
    } else {
      this.hideMenu = false;
    }
    this.previousScroll = newScrollTop;
  }

}
