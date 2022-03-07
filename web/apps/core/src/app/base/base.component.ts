import { Component, ViewContainerRef } from '@angular/core';
import { DialogService } from '@awdware/shared';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { slideInAnimation } from './router-animation';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideInAnimation]
})
export class BaseComponent {
  private readonly _dialogService: DialogService;
  private readonly _menuService: MenuService;
  private _prevActiveRoute: string = '';

  constructor(
    viewContainerRef: ViewContainerRef,
    router: Router,
    dialogService: DialogService,
    menuService: MenuService,
    title: Title
  ) {
    this._dialogService = dialogService;
    this._menuService = menuService;

    // Another one of those very useless but still very fun details :)
    const rndmTitleEmojis = [
      '*^____^*',
      'O(∩_∩)O',
      '(～￣▽￣)～',
      '（*＾-＾*）',
      '(*^_^*)',
      '(❁´◡`❁)',
      '(´▽`ʃ♡ƪ)',
      '♪(^∇^*)',
      '(oﾟvﾟ)ノ',
      '(☆▽☆)',
      '(o゜▽゜)o',
      '☆ヾ(•ω•`)o',
      '\\(￣︶￣*\\)',
      ')(￣o￣) . z Z',
      '\\(@^0^@)/',
      'ヾ(^▽^*)))',
      '✪ ω ✪',
      '♪(´▽｀)',
      'ヽ(✿ﾟ▽ﾟ)ノ',
      '（。＾▽＾）',
      '(☞ﾟヮﾟ)☞',
      '☜(ﾟヮﾟ☜)',
      '(⌐■_■)',
      '(•_•)',
      '¯\\_(ツ)_/¯',
      '( ͡• ͜ʖ ͡• )'
    ];

    // bitwise operator floors a (very tiny) bit faster. Again very unnecessary
    // eslint-disable-next-line no-irregular-whitespace
    title.setTitle(`awdware   ${rndmTitleEmojis[(Math.random() * rndmTitleEmojis.length) | 0]}`);
    this._dialogService.setRootViewContainerRef(viewContainerRef);
    router.events
      .pipe(
        filter(event => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe(() => {
        this._dialogService.hideAllDialogs();
      });
  }

  public prepareRoute(outlet: RouterOutlet) {
    const activePage = outlet?.activatedRouteData?.['activePage'];
    let dir = -1;
    if (activePage !== this._prevActiveRoute) {
      const prevIndex = this._menuService.menuItems?.find(x => x.key === this._prevActiveRoute)?.order ?? 0;
      const activeIndex = this._menuService.menuItems?.find(x => x.key === activePage)?.order ?? 0;
      if (prevIndex < activeIndex) {
        dir = 1;
      }
      this._prevActiveRoute = activePage;
    }
    if (activePage) {
      return { value: activePage, params: { dir } };
    }
    return undefined;
  }

  public get dialogVisible() {
    return this._dialogService.dialogVisible;
  }
}
