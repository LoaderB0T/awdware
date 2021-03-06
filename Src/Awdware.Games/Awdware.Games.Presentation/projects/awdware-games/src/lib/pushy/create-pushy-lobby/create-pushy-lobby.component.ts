import { Component, OnInit } from '@angular/core';

import { BaseDialog } from '@awdware/awdware-shared';
import { RoutingService } from '@awdware/awdware-core';

import { PushyService } from '../services/pushy.service';

@Component({
  selector: 'awd-create-pushy-lobby',
  templateUrl: './create-pushy-lobby.component.html',
  styleUrls: ['./create-pushy-lobby.component.scss']
})
export class CreatePushyLobbyComponent extends BaseDialog implements OnInit {
  private _pushyService: PushyService;
  private _routingService: RoutingService;

  public lobbyName: string;
  public lobbyPassword: string;

  constructor(pushyService: PushyService, routingService: RoutingService) {
    super();
    this._pushyService = pushyService;
    this._routingService = routingService;
  }

  ngOnInit() {
  }

  public createLobby() {
    this._pushyService.createLobby(this.lobbyName, this.lobbyPassword).subscribe(lobby => {
      this.$closeDialog.next();
      this._routingService.navigateToGamesPushyLobby(lobby.id);
    });
  }

  public cancel() {
    this.$closeDialog.next();
  }

}
