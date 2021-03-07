import { Injectable } from '@angular/core';
import { AwdwareConfig, FacadeService, MenuItem } from '@awdware/shared';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly _facadeService: FacadeService;
  private _menuItems: MenuItem[];

  constructor(facadeService: FacadeService) {
    this._facadeService = facadeService;
    this._menuItems = [];

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
    return returnValue.sort((a, b) => a.order - b.order);
  }

  public get enabledMenuItems(): MenuItem[] {
    return this._menuItems.filter(x => x.enabled());
  }

  public get menuItems(): MenuItem[] {
    return this._menuItems;
  }
}
