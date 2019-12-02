import { Component, OnInit } from '@angular/core';
import { PushyService } from '../services/pushy.service';

@Component({
  selector: 'awd-create-pushy-lobby',
  templateUrl: './create-pushy-lobby.component.html',
  styleUrls: ['./create-pushy-lobby.component.scss']
})
export class CreatePushyLobbyComponent implements OnInit {
  private _pushyService: PushyService;
  public lobbyName: string;
  public lobbyPassword: string;

  constructor(pushyService: PushyService) {
    this._pushyService = pushyService;
  }

  ngOnInit() {
  }

  public createLobby() {
    this._pushyService.createLobby(this.lobbyName, this.lobbyPassword);
  }

}
