import { Component, OnInit } from '@angular/core';

import { ThemeService, TranslationService } from '@gah/Awdware.Shared.Presentation/public-api';

import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details';
import { AccountService } from '../account/services/account.service';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private _userInfoService: UserDetailsService;
  private _accountService: AccountService;
  private _themeService: ThemeService;
  private _translationService: TranslationService;

  constructor(
    userInfoService: UserDetailsService,
    accountService: AccountService,
    themeService: ThemeService,
    translationService: TranslationService) {
    this._userInfoService = userInfoService;
    this._accountService = accountService;
    this._themeService = themeService;
    this._translationService = translationService;
  }

  ngOnInit() {
  }

  public get userInfo(): UserDetails {
    return this._userInfoService.userInfo;
  }

  public logout() {
    this._accountService.logout();
  }

  public darkTheme() {
    this._themeService.changeTheme('dark');
  }
  public lightTheme() {
    this._themeService.changeTheme('light');
  }
  public german() {
    this._translationService.setLanguage('de_DE');
  }
  public english() {
    this._translationService.setLanguage('en_US');
  }

}
