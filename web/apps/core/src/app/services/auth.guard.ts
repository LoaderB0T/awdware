import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { RoutingService } from './routing.service';
import { map } from 'rxjs/operators';

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
