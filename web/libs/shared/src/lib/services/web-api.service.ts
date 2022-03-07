import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'ng-dynamic-mf';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private baseUrl: string = '';

  constructor(private readonly httpClient: HttpClient) {
    console.log('web api service constructor called');
    this.init(environment['apiUrl']);
  }

  private init(apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/`;
  }

  private checkInit() {
    if (!this.baseUrl) {
      throw new Error('This service has to be initialized by calling the init method before usage.');
    }
  }

  public get<ResultT extends string>(method: string, parseResponse: boolean): Promise<string>;
  public get<ResultT>(method: string): Promise<ResultT>;
  public get<ResultT>(method: string, parseResponse = true): Promise<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return firstValueFrom(this.httpClient.get<ResultT>(apiUrl).pipe(catchError(this.handleError<ResultT>())));
    } else {
      return firstValueFrom(
        this.httpClient.get(apiUrl, { responseType: 'text' }).pipe(
          catchError(this.handleError()),
          map(x => x as string)
        )
      );
    }
  }

  public post<ResultT extends string>(method: string, body: any, parseResponse: boolean): Promise<string>;
  public post<ResultT>(method: string, body: any): Promise<ResultT>;
  public post<ResultT>(method: string, body: any, parseResponse = true): Promise<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return firstValueFrom(this.httpClient.post<ResultT>(apiUrl, body).pipe(catchError(this.handleError<ResultT>())));
    } else {
      return firstValueFrom(
        this.httpClient.post(apiUrl, body, { responseType: 'text' }).pipe(
          catchError(this.handleError()),
          map(x => x as string)
        )
      );
    }
  }

  public put<ResultT extends string>(method: string, body: any, parseResponse: boolean): Promise<string>;
  public put<ResultT>(method: string, body: any): Promise<ResultT>;
  public put<ResultT>(method: string, body: any, parseResponse = true): Promise<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return firstValueFrom(this.httpClient.put<ResultT>(apiUrl, body).pipe(catchError(this.handleError<ResultT>())));
    } else {
      return firstValueFrom(
        this.httpClient.put(apiUrl, body, { responseType: 'text' }).pipe(
          catchError(this.handleError()),
          map(x => x as string)
        )
      );
    }
  }

  public delete<ResultT extends string>(method: string, parseResponse: boolean): Promise<string>;
  public delete<ResultT>(method: string): Promise<ResultT>;
  public delete<ResultT>(method: string, parseResponse = true): Promise<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return firstValueFrom(this.httpClient.delete<ResultT>(apiUrl).pipe(catchError(this.handleError<ResultT>())));
    } else {
      return firstValueFrom(
        this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
          catchError(this.handleError()),
          map(x => x as string)
        )
      );
    }
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
