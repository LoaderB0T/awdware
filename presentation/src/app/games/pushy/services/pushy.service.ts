import { Injectable } from '@angular/core';
import { SignalrService } from '../../../shared/services/signalr.service';
import { HubConnection } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { GameLobbyInformationDto, UserInfoDto } from '../../../models/application-facade';
import { UserDetailsService } from '../../../services/user-details.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PushyService {
  private _signalrHub: HubConnection;
  private _signalrService: SignalrService;
  private _userDetailsService: UserDetailsService;
  public currentLobby: GameLobbyInformationDto;


  constructor(signalrService: SignalrService, userDetailsService: UserDetailsService) {
    this._signalrService = signalrService;
    this._userDetailsService = userDetailsService;
    this._signalrHub = signalrService.getHubConnection('/pushyhub');
  }

  public registerMovementCallback(): Observable<any> {
    const obs = this._signalrService.onDataRecieved(this._signalrHub, 'onMovement');
    return obs;
  }

  public createLobby(lobbyName: string, lobbyPassword: string) {
    return this._signalrService.sendData<GameLobbyInformationDto>(this._signalrHub, 'CreateLobby', this._userDetailsService.userInfo.userId, lobbyName, lobbyPassword).pipe(tap(lobby => {
      this.currentLobby = lobby;
    }));
  }

  public getLobbies() {
    return this._signalrService.sendData<GameLobbyInformationDto[]>(this._signalrHub, 'GetGameLobbies');
  }

  public joinLobby(lobbyInfo: GameLobbyInformationDto, password: string) {
    this.currentLobby = lobbyInfo;
    return this._signalrService.sendData<void>(this._signalrHub, 'JoinLobby', lobbyInfo.id, this._userDetailsService.userInfo.userId, password);
  }

  public playerJoined(): Observable<UserInfoDto> {
    return this._signalrService.onDataRecieved<UserInfoDto>(this._signalrHub, 'PlayerJoined');
  }
}
