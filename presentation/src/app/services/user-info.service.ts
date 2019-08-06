import { Injectable } from '@angular/core';
import { UserInfoDto } from '../models/application-facade';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public username: string;
  public userId: string;

  public isLoggedIn(): boolean {
    return this.userId && true;
  }

  clearUser() {
    this.userId = null;
    this.username = null;
  }

  setUser(userInfo: UserInfoDto) {
    this.userId = userInfo.userId;
    this.username = userInfo.username;
  }
}
