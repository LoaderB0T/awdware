import { Injectable } from '@angular/core';
import { JwtPayload } from '../models/jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  private _tokenString: string;

  constructor() { }

  public putToken(token: string) {
    this._tokenString = token;
    localStorage.setItem('access_token', token);
  }

  public get hasToken(): boolean {
    if (!this._tokenString) {
      const cachedToken = localStorage.getItem('access_token');
      this._tokenString = cachedToken;
    }

    return this._tokenString && true;
  }

  public getTokenString(): string {
    return this._tokenString;
  }

  public get tokenPayload(): JwtPayload {
    if (!this._tokenString) {
      return null;
    }
    const payloadStr = this._tokenString.split('.')[1];
    const payloadObj = JSON.parse(atob(payloadStr)) as JwtPayload;
    return payloadObj;
  }

  public get userId() {
    return this.tokenPayload.userId;
  }

  public removeToken() {
    localStorage.removeItem('access_token');
    this._tokenString = null;
  }
}
