import { Component, OnInit, Input } from '@angular/core';
import { MenuItem, FacadeService } from 'awdware-core-shared';
import { AwdwareConfig } from 'awdware-core-shared';

@Component({
  selector: 'awd-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private _facadeService: FacadeService;
  private _menuItems: MenuItem[];

  @Input()
  public hideToTop: boolean;

  public opened: boolean = false;

  constructor(facadeService: FacadeService) {
    this._facadeService = facadeService;
    this._menuItems = [
    ];
  }

  ngOnInit() {
    const syncCfg = this._facadeService.getAllConfigs();
    this._menuItems = this.getMenuItemsFromConfigs(syncCfg);
    this._facadeService.updated.subscribe(cfg => {
      this._menuItems = this.getMenuItemsFromConfigs(cfg);
    });
  }

  private getMenuItemsFromConfigs(cfg: AwdwareConfig[]): MenuItem[] {
    const returnValue = new Array<MenuItem>();
    cfg.forEach(x => returnValue.push(...x.menuItems));
    return returnValue;
  }

  public get enabledMenuItems(): MenuItem[] {
    return this._menuItems.filter(x => x.enabled());
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
