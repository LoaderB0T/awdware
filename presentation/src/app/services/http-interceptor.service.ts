import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionStoreService } from './session-store.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private sessionStoreService: SessionStoreService) { }

  private logResponse(ev: HttpEvent<any>) {
    if (ev instanceof HttpResponse) {
      console.log('processing response', ev);
    }
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;
    if (this.sessionStoreService.hasToken) {
      const headers = req.headers.set('Authorization', 'Bearer ' + this.sessionStoreService.getTokenString());
      request = req.clone({ headers });
    } else {
      request = req;
    }
    return next.handle(request).pipe(tap(
      (ev: HttpEvent<any>) => {
        this.logResponse(ev);
      },
      (err: any) => {
        this.handleResponse(err);
      })
    );
  }

  private handleResponse(error: any): void {
    const respError = error as HttpErrorResponse;
    if (respError && (respError.status === 401 || respError.status === 403)) {
      // this.routingService.navigateToAccountLogin();
      // TODO: Implement redirect, except ypu already are on login pare or are currently beeing redirected
    } else {
      // Todo: Visualize Error?
    }
  }
}
