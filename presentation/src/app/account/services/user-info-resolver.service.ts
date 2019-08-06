import { Injectable, RootRenderer } from '@angular/core';
import { Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AccountService } from './account.service';
import { SessionStoreService } from '../../services/session-store.service';
import { SessionService } from '../../services/session.service';
import { UserInfoDto } from '../../models/application-facade';
import { UserInfoService } from 'src/app/services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolverService implements Resolve<UserInfoDto> {
  private _accountService: AccountService;
  private _sessionStoreService: SessionStoreService;
  private _sessionService: SessionService;
  private _userInfoService: UserInfoService;

  constructor(
    accountService: AccountService,
    sessionStoreService: SessionStoreService,
    sessionService: SessionService,
    userInfoService: UserInfoService
  ) {
    this._accountService = accountService;
    this._sessionStoreService = sessionStoreService;
    this._sessionService = sessionService;
    this._userInfoService = userInfoService;
  }

  resolve() {
    return new Observable<UserInfoDto>(obs => {

      if (this._sessionStoreService.hasToken) {
        if (this._sessionService.sessionNeedsRefresh()) {
          this._sessionService.renewSession().subscribe(
            () => {
              this._accountService.loadUserInfo().subscribe(x => {
                obs.next(x);
                obs.complete();
              });
            },
            err => {
              console.log('HTTP Error', err);
              obs.next(null);
              obs.complete();
            });
        } else {
          this._accountService.loadUserInfo().subscribe(
            x => {
              obs.next(x);
              obs.complete();
            },
            err => {
              console.log('HTTP Error', err);
              obs.next(null);
              obs.complete();
            });
        }
      } else {
        this._userInfoService.clearUser();
        obs.next(null);
        obs.complete();
      }
    });
  }
}
