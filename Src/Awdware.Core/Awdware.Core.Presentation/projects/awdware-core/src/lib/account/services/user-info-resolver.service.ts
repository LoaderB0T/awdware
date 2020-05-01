import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AccountService } from './account.service';
import { SessionStoreService } from '../../services/session-store.service';
import { SessionService } from '../../services/session.service';
import { UserDetailsDto } from '../../models/application-facade';
import { UserDetailsService } from '../../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolverService implements Resolve<UserDetailsDto> {
  private _accountService: AccountService;
  private _sessionStoreService: SessionStoreService;
  private _sessionService: SessionService;
  private _userInfoService: UserDetailsService;

  constructor(
    accountService: AccountService,
    sessionStoreService: SessionStoreService,
    sessionService: SessionService,
    userInfoService: UserDetailsService
  ) {
    this._accountService = accountService;
    this._sessionStoreService = sessionStoreService;
    this._sessionService = sessionService;
    this._userInfoService = userInfoService;
  }

  resolve() {
    return new Promise<UserDetailsDto>((resolve, reject) => {
      if (this._sessionStoreService.hasToken) {
        if (this._sessionService.sessionNeedsRefresh()) {
          this._sessionService.renewSession().subscribe(
            () => {
              this._accountService.loadUserDetails().subscribe(x => {
                resolve(x);
              });
            },
            err => {
              console.log('HTTP Error', err);
              resolve(null);
            });
        } else {
          if (this._userInfoService.userInfo?.userId) {
            resolve(this._userInfoService.userInfo);
          } else {
            this._accountService.loadUserDetails().subscribe(
              x => {
                resolve(x);
              },
              err => {
                console.log('HTTP Error', err);
                resolve(null);
              }
            );
          }
        }
      } else {
        this._userInfoService.clearUser();
        resolve(null);
      }
    });
  }
}