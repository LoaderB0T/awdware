import { Component, OnInit } from '@angular/core';
import { GameLobbyInformationDto } from '../../../models/application-facade';
import { PushyService } from '../services/pushy.service';

@Component({
  selector: 'awd-join-pushy-lobby',
  templateUrl: './join-pushy-lobby.component.html',
  styleUrls: ['./join-pushy-lobby.component.scss']
})
export class JoinPushyLobbyComponent implements OnInit {
  private _pushyService: PushyService;
  public lobbies: GameLobbyInformationDto[];
  public password: string;

  constructor(pushyService: PushyService) {
    this._pushyService = pushyService;
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
    this._pushyService.joinLobby(lobby, this.password).subscribe();
  }

}
