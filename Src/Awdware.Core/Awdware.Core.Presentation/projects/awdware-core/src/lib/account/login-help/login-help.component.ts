import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { SubscriptionManager, InputType } from '@awdware/awdware-shared';
import { LoginHelpRequestDto } from '../../models/application-facade';

@Component({
  selector: 'awd-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.scss']
})
export class LoginHelpComponent implements OnInit, OnDestroy {
  public inputType: typeof InputType = InputType;

  public loginHelpModel: LoginHelpRequestDto;
  public clickedButton: boolean;
  public errorMessageKey: string;
  public emailHasBeenSend = false;
  private _accountService: AccountService;
  private _subMgr = new SubscriptionManager();

  @ViewChild('loginHelp', { static: true })
  private _formElement: NgForm;

  constructor(accountService: AccountService) {
    this._accountService = accountService;
    this.errorMessageKey = '';
    this.loginHelpModel = new LoginHelpRequestDto();
  }

  public ngOnInit(): void {

  }

  get loginHelpDisabled(): boolean {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
  }

  public ngOnDestroy() {
    this._subMgr.unsubscribeAll();
  }

  public get loginDisabled(): boolean {
    return false;
  }

  public onSubmit(buttonType: string): void {
    if (buttonType === 'Username') {
      this.sendLoginHelpRequest(false);
    }
    if (buttonType === 'Password') {
      this.sendLoginHelpRequest(true);
    }
  }

  private sendLoginHelpRequest(forgotPassword: boolean) {
    this.clickedButton = true;
    this.errorMessageKey = '';
    if (forgotPassword) {
      this.loginHelpModel.forgotPassword = true;
      this.loginHelpModel.forgotUsername = false;
    } else {
      this.loginHelpModel.forgotPassword = false;
      this.loginHelpModel.forgotUsername = true;
    }
    const resetSub = this._accountService.loginHelp(this.loginHelpModel).subscribe(() => {
      this.emailHasBeenSend = true;
    });
    this._subMgr.add(resetSub);
  }
}
