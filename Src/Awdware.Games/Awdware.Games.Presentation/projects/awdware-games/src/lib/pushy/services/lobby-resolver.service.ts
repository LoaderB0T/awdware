import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RoutingService, UserDetailsService } from '@awdware/awdware-core';

import { PushyService } from './pushy.service';


@Injectable({
  providedIn: 'root'
})
export class PushyLobbyResolverService implements Resolve<any> {
  private _userInfoService: UserDetailsService;
  private _pushyService: PushyService;
  private _routingService: RoutingService;

  constructor(
    userInfoService: UserDetailsService,
    pushyService: PushyService,
    routingService: RoutingService
  ) {
    this._userInfoService = userInfoService;
    this._pushyService = pushyService;
    this._routingService = routingService;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const lobbyId = route.paramMap.get('lobbyId');
    if (this._pushyService.currentLobby) {
      return of(null);
    }
    return this._pushyService.reJoinLobby(this._userInfoService.userInfo.userId, lobbyId)
      .pipe(
        tap(lobby => {
          if (!lobby) {
            this._routingService.navigateToGamesPushy();
          } else {
            this._pushyService.currentLobby = lobby;
          }
        })
      );
  }
}
