import { Injectable } from '@angular/core';
import { interval, Subscription, map, tap, firstValueFrom } from 'rxjs';

import { WebApiService } from '@awdware/shared';

import { SessionStoreService } from './session-store.service';
import { TokenDto } from '../models/session-facade';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly checkSessionInterval = interval(1000 * 60);
  private checkSessionSubscription!: Subscription;

  constructor(private readonly sessionStoreService: SessionStoreService, private readonly webApiService: WebApiService) {}

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

  private async checkSession(): Promise<void> {
    if (this.sessionNeedsRefresh()) {
      await this.renewSession();
    }
  }

  public async hasValidToken(): Promise<boolean> {
    if (!this.sessionStoreService.hasToken) {
      return false;
    }

    return this.renewSession();
  }

  public sessionNeedsRefresh(): boolean {
    if (!this.sessionStoreService.hasToken) {
      return false;
    }

    const payload = this.sessionStoreService.tokenPayload;
    const expireTime = new Date(payload!.exp * 1000);
    // TODO: Remove
    console.log(`Session token expires on: ${expireTime}`);

    const diff = expireTime.getTime() - Date.now();
    return diff < 1000 * 60 * 2; // Expires in less than 2 minutes
  }

  public async renewSession(): Promise<boolean> {
    const x = await this.webApiService.get<TokenDto>('authentication/refreshToken');
    if (!x) {
      this.sessionStoreService.removeToken();
    } else {
      this.sessionStoreService.putToken(x.token);
    }
    return !!x;
  }
}
