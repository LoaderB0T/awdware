import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { InputType } from '../../shared/models/input-type';
import { RoutingService } from 'src/app/services/routing.service';
import { SubscriptionManager } from 'src/app/shared/models/subscription-manager';
import { LoginRequestDto, LoginResult } from 'src/app/models/application-facade';

@Component({
  selector: 'awd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  inputType = InputType;

  public errorMessageKey: string;
  public loginModel: LoginRequestDto;
  public loginSuccessful: boolean = false;
  public clickedButton: boolean = false;

  private _subMgr = new SubscriptionManager();
  private _accountService: AccountService;
  private _routingService: RoutingService;

  @ViewChild('login', { static: true })
  private _formElement: NgForm;

  constructor(
    accountService: AccountService,
    routingService: RoutingService
  ) {
    this._accountService = accountService;
    this._routingService = routingService;
    this.loginModel = new LoginRequestDto();
  }

  public ngOnInit(): void {

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
    this._routingService.navigateToHomeHello();
  }

  public get loginDisabled(): boolean {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
  }

}
