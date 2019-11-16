import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../models/user-info';
import { AccountService } from '../account/services/account.service';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private _userInfoService: UserInfoService;
  private _accountService: AccountService;

  constructor(userInfoService: UserInfoService, accountService: AccountService) {
    this._userInfoService = userInfoService;
    this._accountService = accountService;
  }

  ngOnInit() {
  }

  public get userInfo(): UserInfo {
    return this._userInfoService.userInfo;
  }

  public logout() {
    this._accountService.logout();
  }

}
