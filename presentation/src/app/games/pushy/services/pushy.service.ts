import { Injectable } from '@angular/core';
import { SignalrService } from '../../../shared/services/signalr.service';
import { HubConnection } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class PushyService {
  _signalrHub: HubConnection;

  constructor(signalrService: SignalrService) {
    this._signalrHub = signalrService.getHubConnection('/hardwaredata');
  }
}
