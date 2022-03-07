import { Component, OnInit } from '@angular/core';

import { FacadeService, RoutingService, TabViewContent } from '@awdware/shared';

@Component({
  selector: 'awd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private readonly _routingService: RoutingService;
  private readonly _facadeService: FacadeService;

  public accountTabContent: TabViewContent;

  constructor(routingService: RoutingService, facadeService: FacadeService) {
    this._routingService = routingService;
    this._facadeService = facadeService;

    this.accountTabContent = {} as TabViewContent;
    this.accountTabContent.tabs = [
      { id: 'login', text: 'account.login.heading', clicked: () => this._routingService.navigateToAccountLogin() },
      { id: 'register', text: 'account.register.heading', clicked: () => this._routingService.navigateToAccountRegister() },
      { id: 'help', text: 'account.help.heading', clicked: () => this._routingService.navigateToAccountHelp() }
    ];
  }

  ngOnInit() {
    this._facadeService.setActiveMenuItem('login');
  }
}
