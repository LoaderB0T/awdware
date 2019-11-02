import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../models/user-info';
import { LedService } from './services/led.service';
import { LedConfigurationDto } from '../models/application-facade';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _userInfoService: UserInfoService;
  private _ledService: LedService;
  ledConfigs: LedConfigurationDto[];

  constructor(userInfoService: UserInfoService, ledService: LedService) {
    this._userInfoService = userInfoService;
    this._ledService = ledService;
  }

  ngOnInit() {
    this._ledService.getConfigs().subscribe(x => {
      this.ledConfigs = x;
    });
  }

  public get userInfo(): UserInfo {
    return this._userInfoService.userInfo;
  }


}
