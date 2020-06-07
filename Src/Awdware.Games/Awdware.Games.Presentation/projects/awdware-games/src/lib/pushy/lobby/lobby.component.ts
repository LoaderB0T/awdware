import { Component, OnInit } from '@angular/core';

import { RoutingService } from '@gah/Awdware.Core.Presentation';

import { PushyService } from '../services/pushy.service';
import { GameLobbyInformationDto } from '../../models/application-facade';

@Component({
  selector: 'awd-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  private _pushyService: PushyService;
  private _routingService: RoutingService;

  public get lobby(): GameLobbyInformationDto {
    return this._pushyService.currentLobby;
  }

  constructor(pushyService: PushyService, routingService: RoutingService) {
    this._pushyService = pushyService;
    this._routingService = routingService;
  }

  ngOnInit() {
    this._pushyService.playersChanged().subscribe(players => {
      this.lobby.players = players;
    });
    this._pushyService.gameStarted().subscribe({
      next: () => {
        this._routingService.navigateToGamesPushyField(this._pushyService.currentLobby.id);
      }
    });
  }

  public get isOwner(): boolean {
    return this._pushyService.myPlayer.lobbyOwner;
  }

  public get canStartGame(): boolean {
    return this._pushyService.validPlayerCount;
  }

  public start() {
    this._pushyService.startGame().subscribe();
  }

}
