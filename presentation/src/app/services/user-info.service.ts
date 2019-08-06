import { Injectable } from '@angular/core';
import { UserInfoDto } from '../models/application-facade';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public userInfo: UserInfo;

  constructor() {
    this.userInfo = new UserInfo();
  }

  public isLoggedIn(): boolean {
    return this.userInfo && true;
  }

  clearUser() {
    this.userInfo = null;
  }

  setUser(userInfo: UserInfoDto) {
    this.userInfo.userId = userInfo.userId;
    this.userInfo.username = userInfo.username;
  }
}
