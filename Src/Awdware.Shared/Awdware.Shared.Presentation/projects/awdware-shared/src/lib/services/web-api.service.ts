import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private baseUrl: string = '';

  constructor(private readonly httpClient: HttpClient) {
    console.log('web api service constructor called');
  }

  public init(apiUrl: string) {
    this.baseUrl = `${apiUrl}/api/`;
  }

  private checkInit() {
    if (!this.baseUrl) {
      throw new Error('This service has to be initialized by calling the init method before usage.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public get<ResultT extends string>(method: string, parseResponse: boolean): Observable<string>;
  public get<ResultT>(method: string): Observable<ResultT>;
  public get<ResultT>(method: string, parseResponse = true): Observable<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return this.httpClient.get<ResultT>(apiUrl).pipe(catchError(this.handleError<ResultT>()));
    } else {
      return this.httpClient.get(apiUrl, { responseType: 'text' }).pipe(
        catchError(this.handleError()),
        map(x => x as string)
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public post<ResultT extends string>(method: string, body: any, parseResponse: boolean): Observable<string>;
  public post<ResultT>(method: string, body: any): Observable<ResultT>;
  public post<ResultT>(method: string, body: any, parseResponse = true): Observable<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return this.httpClient.post<ResultT>(apiUrl, body).pipe(catchError(this.handleError<ResultT>()));
    } else {
      return this.httpClient.post(apiUrl, body, { responseType: 'text' }).pipe(
        catchError(this.handleError()),
        map(x => x as string)
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public put<ResultT extends string>(method: string, body: any, parseResponse: boolean): Observable<string>;
  public put<ResultT>(method: string, body: any): Observable<ResultT>;
  public put<ResultT>(method: string, body: any, parseResponse = true): Observable<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return this.httpClient.put<ResultT>(apiUrl, body).pipe(catchError(this.handleError<ResultT>()));
    } else {
      return this.httpClient.put(apiUrl, body, { responseType: 'text' }).pipe(
        catchError(this.handleError()),
        map(x => x as string)
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public delete<ResultT extends string>(method: string, parseResponse: boolean): Observable<string>;
  public delete<ResultT>(method: string): Observable<ResultT>;
  public delete<ResultT>(method: string, parseResponse = true): Observable<ResultT | string> {
    this.checkInit();
    const apiUrl = this.baseUrl + method;
    if (parseResponse) {
      return this.httpClient.delete<ResultT>(apiUrl).pipe(catchError(this.handleError<ResultT>()));
    } else {
      return this.httpClient.delete(apiUrl, { responseType: 'text' }).pipe(
        catchError(this.handleError()),
        map(x => x as string)
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
