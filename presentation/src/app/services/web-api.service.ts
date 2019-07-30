import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.buildBaseUrl();
  }

  private buildBaseUrl(): void {
    this.baseUrl = environment.apiUrl + '/api/';
  }

  public get<ResultT>(method: string): Observable<ResultT> {
    const apiUrl = this.baseUrl + method;
    return this.httpClient.get<ResultT>(apiUrl)
      .pipe(
        catchError(this.handleError<ResultT>())
      );
  }

  public post<ResultT>(method: string, body: any): Observable<ResultT> {
    const apiUrl = this.baseUrl + method;
    return this.httpClient.post<ResultT>(apiUrl, body)
      .pipe(
        catchError(this.handleError<ResultT>())
      );
  }

  public put<ResultT>(method: string, body: any): Observable<ResultT> {
    const apiUrl = this.baseUrl + method;
    return this.httpClient.put<ResultT>(apiUrl, body)
      .pipe(
        catchError(this.handleError<ResultT>())
      );
  }

  public delete<ResultT>(method: string): Observable<ResultT> {
    const apiUrl = this.baseUrl + method;
    return this.httpClient.delete<ResultT>(apiUrl)
      .pipe(
        catchError(this.handleError<ResultT>())
      );
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
