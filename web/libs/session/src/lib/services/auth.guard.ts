import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoutingService } from '@awdware/shared';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly _sessionService: SessionService;
  private readonly _routingService: RoutingService;

  constructor(sessionService: SessionService, routingService: RoutingService) {
    this._sessionService = sessionService;
    this._routingService = routingService;
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const hasValidToken = await this._sessionService.hasValidToken();

    if (hasValidToken) {
      return true;
    }
    this._routingService.navigateToAccountLogin(state.url);
    return false;
  }
}
