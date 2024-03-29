import { Component, OnInit } from '@angular/core';
import { UserDetailsService, AccountService, UserDetails } from '@awdware/session';

import { FacadeService } from '@awdware/shared';

@Component({
  selector: 'awd-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private readonly _userInfoService: UserDetailsService;
  private readonly _accountService: AccountService;
  private readonly _facadeService: FacadeService;

  constructor(userInfoService: UserDetailsService, accountService: AccountService, facadeService: FacadeService) {
    this._userInfoService = userInfoService;
    this._accountService = accountService;
    this._facadeService = facadeService;
  }

  ngOnInit() {
    this._facadeService.setActiveMenuItem('me');
  }

  public get userInfo(): UserDetails {
    return this._userInfoService.userInfo;
  }

  public logout() {
    this._accountService.logout();
  }
}
