import { Injectable } from '@angular/core';
import { UserDetailsDto } from '../models/application-facade';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  public userInfo: UserDetails;

  constructor() {
    this.userInfo = new UserDetails();
  }

  public isLoggedIn(): boolean {
    return this.userInfo && true;
  }

  clearUser() {
    this.userInfo.userId = null;
    this.userInfo.username = null;
  }

  setUser(userInfo: UserDetailsDto) {
    this.userInfo.userId = userInfo.userId;
    this.userInfo.username = userInfo.username;
  }
}
