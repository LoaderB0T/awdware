import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '@awdware/session';

import { SubscriptionManager, InputType, RoutingService } from '@awdware/shared';
import { LoginRequestDto, LoginResult } from 'libs/session/src/lib/models/session-facade';

@Component({
  selector: 'awd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  inputType = InputType;

  public errorMessageKey?: string;
  public loginModel: LoginRequestDto;
  public loginSuccessful: boolean = false;
  public clickedButton: boolean = false;

  private readonly _subMgr = new SubscriptionManager();
  private readonly _accountService: AccountService;
  private readonly _routingService: RoutingService;

  @ViewChild('login', { static: true })
  private readonly _formElement?: NgForm;

  constructor(accountService: AccountService, routingService: RoutingService) {
    this._accountService = accountService;
    this._routingService = routingService;
    this.loginModel = { username: '', password: '' };
  }

  public onSubmit(): void {
    this.login();
  }

  public ngOnDestroy(): void {
    this._subMgr.unsubscribeAll();
  }

  private login() {
    this.errorMessageKey = '';
    this.clickedButton = true;
    const loginSub = this._accountService.login(this.loginModel).subscribe(x => {
      if (x === LoginResult.SUCCESS) {
        this.successfullLogin();
      } else {
        this.clickedButton = false;
        if (x === LoginResult.WRONG_PASSWORD) {
          this.errorMessageKey = 'wrongPassword';
        } else if (x === LoginResult.WRONG_USERNAME) {
          this.errorMessageKey = 'wrongUsername';
        } else {
          this.errorMessageKey = 'unknown';
        }
      }
    });
    this._subMgr.add(loginSub);
  }

  private successfullLogin() {
    this.loginSuccessful = true;
    this._routingService.navigateAfterLoggin();
  }

  public get loginDisabled(): boolean | undefined {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
    return undefined;
  }
}
