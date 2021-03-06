import { Component, OnInit } from '@angular/core';

import { ThemeService, TranslationService } from '@awdware/shared';

import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details';
import { AccountService } from '../account/services/account.service';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private readonly _userInfoService: UserDetailsService;
  private readonly _accountService: AccountService;
  private readonly _themeService: ThemeService;
  private readonly _translationService: TranslationService;

  constructor(
    userInfoService: UserDetailsService,
    accountService: AccountService,
    themeService: ThemeService,
    translationService: TranslationService
  ) {
    this._userInfoService = userInfoService;
    this._accountService = accountService;
    this._themeService = themeService;
    this._translationService = translationService;
  }

  ngOnInit() {}

  public get userInfo(): UserDetails {
    return this._userInfoService.userInfo;
  }

  public logout() {
    this._accountService.logout();
  }
}
