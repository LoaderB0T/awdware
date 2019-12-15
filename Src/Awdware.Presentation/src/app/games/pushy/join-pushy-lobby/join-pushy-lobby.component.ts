import { Component, OnInit } from '@angular/core';
import { GameLobbyInformationDto } from '../../../models/application-facade';
import { PushyService } from '../services/pushy.service';
import { BaseDialog } from '../../../shared/models/base-dialog.model';
import { RoutingService } from '../../../services/routing.service';

@Component({
  selector: 'awd-join-pushy-lobby',
  templateUrl: './join-pushy-lobby.component.html',
  styleUrls: ['./join-pushy-lobby.component.scss']
})
export class JoinPushyLobbyComponent extends BaseDialog implements OnInit {
  private _routingService: RoutingService;
  private _pushyService: PushyService;
  public lobbies: GameLobbyInformationDto[];
  public password: string;


  constructor(pushyService: PushyService, routingService: RoutingService) {
    super();
    this._pushyService = pushyService;
    this._routingService = routingService;
  }

  ngOnInit() {
    this.refresh();
  }

  public refresh() {
    this._pushyService.getLobbies().subscribe(lobbies => {
      this.lobbies = lobbies;
    });
  }

  public joinLobby(lobbyId: string) {
    const lobby = this.lobbies.find(x => x.id === lobbyId);
    this.$closeDialog.next();
    this._pushyService.joinLobby(lobby, this.password).subscribe(() => {
      this._routingService.navigateToGamesPushyLobby(lobbyId);
    });
  }

  public cancel() {
    this.$closeDialog.next();
  }
}
