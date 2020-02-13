import { Component, OnInit } from '@angular/core';
import { DialogService } from 'awdware-shared';

import { CreatePushyLobbyComponent } from './create-pushy-lobby/create-pushy-lobby.component';
import { JoinPushyLobbyComponent } from './join-pushy-lobby/join-pushy-lobby.component';

@Component({
  selector: 'awd-pushy',
  templateUrl: './pushy.component.html',
  styleUrls: ['./pushy.component.scss']
})
export class PushyComponent implements OnInit {
  private _dialogService: DialogService;

  constructor(dialogService: DialogService) {
    this._dialogService = dialogService;
  }

  ngOnInit() {
  }

  public createLobbyDialog() {
    const newLobbyComponent = this._dialogService.showComponentDialog(CreatePushyLobbyComponent);
  }

  public joinLobbyDialog() {
    const joinLobbyComponent = this._dialogService.showComponentDialog(JoinPushyLobbyComponent);
  }

}
