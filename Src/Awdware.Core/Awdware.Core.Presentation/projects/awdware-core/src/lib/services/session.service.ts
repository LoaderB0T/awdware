import { Injectable } from '@angular/core';
import { interval, Observable, Subscription, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WebApiService } from 'awdware-shared';

import { TokenDto } from '../models/application-facade';
import { SessionStoreService } from './session-store.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private checkSessionInterval = interval(1000 * 60);
  private checkSessionSubscription: Subscription;


  constructor(private sessionStoreService: SessionStoreService, private webApiService: WebApiService) {
  }

  public startCheckSession() {
    this.checkSession();
    this.checkSessionSubscription = this.checkSessionInterval.subscribe(() => {
      this.checkSession();
    });
  }

  public stopCheckSession() {
    if (this.checkSessionSubscription) {
      this.checkSessionSubscription.unsubscribe();
    }
  }

  private checkSession(): void {
    if (this.sessionNeedsRefresh()) {
      this.renewSession().subscribe();
    }
  }

  public hasValidToken(): Observable<boolean> {
    if (!this.sessionStoreService.hasToken) {
      return of(false);
    }

    if (this.sessionNeedsRefresh()) {
      return this.renewSession();
    } else {
      return of(true);
    }
  }

  public sessionNeedsRefresh(): boolean {
    if (!this.sessionStoreService.hasToken) {
      return false;
    }

    const payload = this.sessionStoreService.tokenPayload;
    const expireTime = new Date(payload.exp * 1000);
    // TODO: Remove
    console.log('Session token expires on: ' + expireTime);

    const diff = expireTime.getTime() - Date.now();
    return diff < 1000 * 60 * 2; // Expires in less than 2 minutes
  }

  public renewSession(): Observable<boolean> {
    return this.webApiService.get<TokenDto>('authentication/refreshToken')
      .pipe(
        tap(x => {
          if (!x) {
            this.sessionStoreService.removeToken();
          } else {
            this.sessionStoreService.putToken(x.token);
          }
        }),
        map(
          (x) => {
            return x && true;
          }
        )
      );
  }
}
