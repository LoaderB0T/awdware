import { Component, OnInit, Input } from '@angular/core';
import { AwdwareConfig, MenuItem, FacadeService } from '@awdware/shared';

@Component({
  selector: 'awd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private readonly _facadeService: FacadeService;
  private _menuItems: MenuItem[];

  @Input()
  public hideToTop: boolean;

  public opened: boolean = false;

  public social = [
    {
      icon: 'github',
      link: 'https://github.com/LoaderB0T',
      text: 'GitHub'
    },
    {
      icon: 'twitter',
      link: 'https://twitter.com/TheLoaderB0T',
      text: 'Twitter'
    },
    {
      icon: 'steam',
      link: 'https://steamcommunity.com/id/loaderb0t',
      text: 'Steam'
    },
    {
      icon: 'linkedin-in',
      link: 'https://www.linkedin.com/in/janikschumacher/',
      text: 'LinkedIn'
    },
    {
      icon: 'xing',
      link: 'https://www.xing.com/profile/Janik_Schumacher',
      text: 'Xing'
    }
  ];

  constructor(facadeService: FacadeService) {
    this._facadeService = facadeService;
    this._menuItems = [];
  }

  ngOnInit() {
    const syncCfg = this._facadeService.getAllConfigs();
    this._menuItems = this.getMenuItemsFromConfigs(syncCfg);
    this._facadeService.updated.subscribe(cfg => {
      this._menuItems = this.getMenuItemsFromConfigs(cfg);
    });
    this._facadeService.activeMenuItem.subscribe(key => {
      this._menuItems.forEach(menuItem => {
        if (menuItem.key === key) {
          menuItem.active = true;
        } else {
          menuItem.active = false;
        }
      });
    });
  }

  private getMenuItemsFromConfigs(cfg: AwdwareConfig[]): MenuItem[] {
    const returnValue = new Array<MenuItem>();
    cfg?.forEach(x => returnValue.push(...x.menuItems));
    return returnValue;
  }

  public get enabledMenuItems(): MenuItem[] {
    return this._menuItems.filter(x => x.enabled()).sort((a, b) => a.order - b.order);
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
