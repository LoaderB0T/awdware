import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service';


@Injectable({
  providedIn: 'root'
})
export class NoopInterceptorService implements HttpInterceptor {

  constructor(private facadeService: FacadeService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.facadeService?.intercept(req, next) ?? next.handle(req);
  }
}
