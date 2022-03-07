import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountService } from '@awdware/session';
import { InputType } from '@awdware/shared';
import { LoginHelpRequestDto } from 'libs/session/src/lib/models/session-facade';

@Component({
  selector: 'awd-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.scss']
})
export class LoginHelpComponent {
  public inputType: typeof InputType = InputType;

  public loginHelpModel: LoginHelpRequestDto;
  public clickedButton: boolean = false;
  public errorMessageKey?: string;
  public emailHasBeenSend = false;
  private readonly _accountService: AccountService;

  @ViewChild('loginHelp', { static: true })
  private readonly _formElement?: NgForm;

  constructor(accountService: AccountService) {
    this._accountService = accountService;
    this.errorMessageKey = '';
    this.loginHelpModel = {} as LoginHelpRequestDto;
  }

  get loginHelpDisabled(): boolean {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
    return false;
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
    this._accountService.loginHelp(this.loginHelpModel).then(() => {
      this.emailHasBeenSend = true;
    });
  }
}
