import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';
import { Observable, of, from } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public mSecondsTillLastData: number = 0;
  private readonly _listeners = new Map<string, Observable<any>>();

  public onDataRecieved<T>(hub: HubConnection, methodName: string): Observable<T> {
    if (this._listeners.has(methodName)) {
      return this._listeners.get(methodName) as Observable<T>;
    }

    const returnVal = new Observable<T>(obs => {
      hub.on(methodName, (x: T) => {
        obs.next(x);
      });
    });
    this._listeners.set(methodName, returnVal);

    return returnVal;
  }

  public sendData<T>(hub: HubConnection, methodName: string, ...args: any[]): Observable<T> {
    return this.ensureConnection(hub).pipe(concatMap(() => from(hub.invoke<T>(methodName, ...args))));
  }

  public getHubConnection(apiUrl: string, hubUrl: string): HubConnection {
    const hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(apiUrl + hubUrl)
      .build();

    return hubConnection;
  }

  public ensureConnection(hub: HubConnection): Observable<null> {
    if (hub.state === HubConnectionState.Connected) {
      return of(null);
    }
    return from(hub.start()).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      }),
      map(() => null)
    );
  }
}
