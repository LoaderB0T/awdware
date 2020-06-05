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

  private _sessionService: SessionService;
  private _routingService: RoutingService;

  constructor(sessionService: SessionService, routingService: RoutingService) {
    this._sessionService = sessionService;
    this._routingService = routingService;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._sessionService.hasValidToken().pipe(
      map(res => {
        if (res) {
          return true;
        }
        this._routingService.navigateToAccountLogin(state.url);
        return false;
      })
    );
  }
}
