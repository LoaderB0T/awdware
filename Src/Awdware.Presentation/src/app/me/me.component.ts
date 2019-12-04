import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
import { UserDetails } from '../models/user-details';
import { AccountService } from '../account/services/account.service';
import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private _userInfoService: UserDetailsService;
  private _accountService: AccountService;
  private _themeService: ThemeService;

  constructor(userInfoService: UserDetailsService, accountService: AccountService, themeService: ThemeService) {
    this._userInfoService = userInfoService;
    this._accountService = accountService;
    this._themeService = themeService;
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

}
