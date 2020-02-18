import { Component, OnInit } from '@angular/core';

import { RoutingService } from 'awdware-core';

@Component({
  selector: 'awd-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {
  _routingService: RoutingService;

  constructor(routingService: RoutingService) {
    this._routingService = routingService;
  }

  ngOnInit() {
  }

  public navigateToPushy() {
    this._routingService.navigateToGamesPushy();
  }

}
