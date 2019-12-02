import { Injectable } from '@angular/core';
import { SignalrService } from '../../../shared/services/signalr.service';
import { HubConnection } from '@aspnet/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushyService {
  private _signalrHub: HubConnection;
  private _signalrService: SignalrService;

  constructor(signalrService: SignalrService) {
    this._signalrService = signalrService;
    this._signalrHub = signalrService.getHubConnection('/hardwaredata');
  }

  public registerMovementCallback(): Observable<any> {
    const obs = this._signalrService.onDataRecieved(this._signalrHub, 'onMovement');
    return obs;
  }

  public createLobby(lobbyName: string, lobbyPassword: string) {
    // this._signalrService.
  }
}
