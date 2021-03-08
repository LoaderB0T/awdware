import { Component, Input } from '@angular/core';
import { MenuItem } from '@awdware/shared';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'awd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private readonly _menuService: MenuService;

  constructor(menuService: MenuService) {
    this._menuService = menuService;
  }

  @Input()
  public hideToTop: boolean;

  public opened: boolean = false;

  public social = [
    {
      icon: 'github',
      link: 'https://github.com/LoaderB0T',
      text: 'GitHub',
      color: '#fafafa'
    },
    {
      icon: 'twitter',
      link: 'https://twitter.com/TheLoaderB0T',
      text: 'Twitter',
      color: '#1DA1F2'
    },
    {
      icon: 'steam',
      link: 'https://steamcommunity.com/id/loaderb0t',
      text: 'Steam',
      color: '#171a21'
    },
    {
      icon: 'linkedin-in',
      link: 'https://www.linkedin.com/in/janikschumacher/',
      text: 'LinkedIn',
      color: '#2867B2'
    },
    {
      icon: 'xing',
      link: 'https://www.xing.com/profile/Janik_Schumacher',
      text: 'Xing',
      color: '#cfdc00'
    }
  ];

  public get enabledMenuItems(): MenuItem[] {
    return this._menuService.enabledMenuItems;
  }

  public get selectedMenuItemLeftPos(): number {
    const key = this.enabledMenuItems.find(x => x.active)?.key;
    const element = document.getElementById(`menu-item-${key}`);
    return element?.getBoundingClientRect().left ?? 0;
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
