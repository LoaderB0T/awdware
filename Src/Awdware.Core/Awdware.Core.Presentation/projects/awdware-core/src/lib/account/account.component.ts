import { Component, OnInit } from '@angular/core';

import { RoutingService } from '../services/routing.service';
import { ToolbarProviderService } from '../services/toolbar-provider.service';
import { TabViewContent } from '@gah/Awdware.Shared.Presentation';

@Component({
  selector: 'awd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private readonly _routingService: RoutingService;
  private readonly _toolbarProviderService: ToolbarProviderService;

  public accountTabContent: TabViewContent;

  constructor(
    routingService: RoutingService,
    toolbarProviderService: ToolbarProviderService
  ) {
    this._routingService = routingService;
    this._toolbarProviderService = toolbarProviderService;

    this.accountTabContent = new TabViewContent();
    this.accountTabContent.tabs = [
      { id: 'login', text: 'account.login.heading', clicked: () => this._routingService.navigateToAccountLogin() },
      { id: 'register', text: 'account.register.heading', clicked: () => this._routingService.navigateToAccountRegister() },
      { id: 'help', text: 'account.help.heading', clicked: () => this._routingService.navigateToAccountHelp() },
    ];
  }

  ngOnInit() {
    this._toolbarProviderService.activeItem = 'account.login.heading';
  }
}
