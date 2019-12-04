import { Component, OnInit } from '@angular/core';
import { GameLobbyInformationDto } from '../../../models/application-facade';
import { PushyService } from '../services/pushy.service';

@Component({
  selector: 'awd-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  private _pushyService: PushyService;

  public get lobby(): GameLobbyInformationDto {
    return this._pushyService.currentLobby;
  }

  constructor(pushyService: PushyService) {
    this._pushyService = pushyService;
  }

  ngOnInit() {
    this._pushyService.playerJoined().subscribe(playerInfo => {
      this.lobby.users.push(playerInfo);
    });
  }

}
