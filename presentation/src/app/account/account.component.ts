import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoutingService } from '../services/routing.service';
import { ToolbarProviderService } from '../services/toolbar-provider.service';

@Component({
  selector: 'awd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private readonly _routingService: RoutingService;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _toolbarProviderService: ToolbarProviderService;
  public selectedAction: string = 'login';

  constructor(
    routingService: RoutingService,
    activatedRoute: ActivatedRoute,
    toolbarProviderService: ToolbarProviderService
  ) {
    this._routingService = routingService;
    this._activatedRoute = activatedRoute;
    this._toolbarProviderService = toolbarProviderService;
  }

  ngOnInit() {
    this._toolbarProviderService.activeItem = 'account.login.heading';
    this._activatedRoute.url.subscribe(x => {
      this.selectedAction = this._activatedRoute.snapshot.firstChild.url[0].path;
    });
  }

  selectAction(action: string) {
    switch (action) {
      case 'login':
        this._routingService.navigateToAccountLogin();
        return;
      case 'help':
        this._routingService.navigateToAccountHelp();
        return;
      case 'register':
      default:
        this._routingService.navigateToAccountRegister();
        return;
    }
  }

}
