import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public mSecondsTillLastData: number;
  private _listeners = new Map<string, Observable<any>>();

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

  public getHubConnection(hubUrl: string): HubConnection {
    const hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Trace)
      .withUrl(environment.apiUrl + hubUrl).build();

    return hubConnection;
  }
}
