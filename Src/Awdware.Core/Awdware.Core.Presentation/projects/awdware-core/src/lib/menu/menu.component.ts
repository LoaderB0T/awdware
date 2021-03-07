import { Component, Input } from '@angular/core';
import { MenuItem } from '@awdware/shared';
import { Observable } from 'rxjs';
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

  public get enabledMenuItems(): MenuItem[] {
    return this._menuService.enabledMenuItems;
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
