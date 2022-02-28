import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';

import { AccountService } from './account.service';
import { SessionStoreService } from '../../services/session-store.service';
import { SessionService } from '../../services/session.service';
import { UserDetailsDto } from '../../models/application-facade';
import { UserDetailsService } from '../../services/user-details.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolverService implements Resolve<UserDetailsDto | undefined> {
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

  async resolve(): Promise<UserDetailsDto | undefined> {
    const isValidToken = await this._sessionService.hasValidToken();
    if (!isValidToken) {
      return undefined;
    }
    return firstValueFrom(this._accountService.loadUserDetails());
  }
}
