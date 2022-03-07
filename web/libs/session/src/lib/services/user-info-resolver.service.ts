import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';

import { AccountService } from './account.service';

import { mergeMap } from 'rxjs/operators';
import { SessionStoreService } from './session-store.service';
import { SessionService } from './session.service';
import { UserDetailsService } from './user-details.service';
import { UserDetailsDto } from '../models/session-facade';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolverService implements Resolve<UserDetailsDto | null> {
  private readonly _accountService: AccountService;
  private readonly _sessionStoreService: SessionStoreService;
  private readonly _sessionService: SessionService;
  private readonly _userInfoService: UserDetailsService;

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

  async resolve(): Promise<UserDetailsDto | null> {
    const isValidToken = await this._sessionService.hasValidToken();
    if (!isValidToken) {
      return null;
    }
    return this._accountService.loadUserDetails();
  }
}
