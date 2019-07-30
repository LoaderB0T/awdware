import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AccountService } from './account.service';
import { SessionStoreService } from '../../services/session-store.service';
import { SessionService } from '../../services/session.service';
import { UserInfoDto } from '../../models/application-facade';

@Injectable()
export class UserInfoResolverService implements Resolve<UserInfoDto> {

  constructor(private accountService: AccountService, private sessionStoreService: SessionStoreService, private sessionService: SessionService) { }

  resolve() {
    return new Observable<UserInfoDto>(obs => {

      if (this.sessionStoreService.hasToken) {
        if (this.sessionService.sessionNeedsRefresh()) {
          this.sessionService.renewSession().subscribe(
            () => {
              this.accountService.loadUserInfo(this.sessionStoreService.userId).subscribe(x => {
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
          this.accountService.loadUserInfo(this.sessionStoreService.userId).subscribe(
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
        obs.next(null);
        obs.complete();
      }
    });
  }
}
