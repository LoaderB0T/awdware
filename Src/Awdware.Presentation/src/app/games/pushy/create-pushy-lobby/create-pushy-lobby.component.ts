import { Component, OnInit } from '@angular/core';
import { PushyService } from '../services/pushy.service';
import { Subject } from 'rxjs';
import { RoutingService } from '../../../services/routing.service';

@Component({
  selector: 'awd-create-pushy-lobby',
  templateUrl: './create-pushy-lobby.component.html',
  styleUrls: ['./create-pushy-lobby.component.scss']
})
export class CreatePushyLobbyComponent implements OnInit {
  private _pushyService: PushyService;
  private _routingService: RoutingService;

  public lobbyName: string;
  public lobbyPassword: string;

  private $closeDialog = new Subject();
  public closeDialog = this.$closeDialog.asObservable();

  constructor(pushyService: PushyService, routingService: RoutingService) {
    this._pushyService = pushyService;
    this._routingService = routingService;
  }

  ngOnInit() {
  }

  public createLobby() {
    this._pushyService.createLobby(this.lobbyName, this.lobbyPassword).subscribe(() => {
      this.$closeDialog.next();
      this._routingService.navigateToGamesPushyLobby();
    });
  }

}
