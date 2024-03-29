import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionStoreService } from './session-store.service';
import { RoutingService } from '@awdware/shared';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private readonly sessionStoreService: SessionStoreService, private readonly routingService: RoutingService) {}

  private logResponse(ev: HttpEvent<any>) {
    if (ev instanceof HttpResponse) {
      console.log('processing response', ev);
    }
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;
    if (this.sessionStoreService.hasToken) {
      const headers = req.headers.set('Authorization', `Bearer ${this.sessionStoreService.getTokenString()}`);
      request = req.clone({ headers, withCredentials: true });
    } else {
      request = req.clone({ withCredentials: true });
    }
    return next.handle(request).pipe(
      tap(
        (ev: HttpEvent<any>) => {
          this.logResponse(ev);
        },
        (err: HttpErrorResponse) => {
          this.handleResponse(err);
        }
      )
    );
  }

  private handleResponse(error: HttpErrorResponse): void {
    console.log(error);
    if (error && (error.status === 401 || error.status === 403)) {
      // this.routingService.navigateToAccountLogin();
      // TODO: Implement redirect, except ypu already are on login pare or are currently beeing redirected
    } else if (error.status === 404 || error.status >= 500 || !error.status) {
      // this.routingService.navigateToError(error.status ?? 0);
    } else {
      // Todo: Visualize Error?
    }
  }
}
