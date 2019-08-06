import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../models/user-info';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private _userInfoService: UserInfoService;

  constructor(userInfoService: UserInfoService) {
    this._userInfoService = userInfoService;
  }

  ngOnInit() {
  }

  public get userInfo(): UserInfo {
    return this._userInfoService.userInfo;
  }

}
