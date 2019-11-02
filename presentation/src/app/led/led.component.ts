import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../models/user-info';
import { LedService } from './services/led.service';
import { LedConfig } from './models/led-config.model';
import { LedEffectProperty } from './models/led-effect-property.model';
import { LedEffectPropertyType } from '../models/application-facade';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _userInfoService: UserInfoService;
  private _ledService: LedService;
  ledConfigs: LedConfig[];

  constructor(userInfoService: UserInfoService, ledService: LedService) {
    this._userInfoService = userInfoService;
    this._ledService = ledService;
  }

  ngOnInit() {
    this._ledService.getConfigs().subscribe(x => {
      this.ledConfigs = x;
      this.updateTemp();
    });
  }

  public get userInfo(): UserInfo {
    return this._userInfoService.userInfo;
  }

  updateTemp() {
    const a = this.ledConfigs[0];
    a.props = [
      {
        effectType: LedEffectPropertyType.BOOL,
        value: true
      },
      {
        effectType: LedEffectPropertyType.NUMBER,
        value: 2,
        minVal: 1,
        maxVal: 100
      } as LedEffectProperty
    ];

    this._ledService.updateConfig(a.toDto()).subscribe();
  }

}
