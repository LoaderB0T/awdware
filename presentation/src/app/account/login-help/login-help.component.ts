import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InputType } from 'src/app/shared/models/input-type';
import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms';
import { LoginHelpRequestDto } from 'src/app/models/application-facade';
import { SubscriptionManager } from 'src/app/shared/models/subscription-manager';

@Component({
  selector: 'awd-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.scss']
})
export class LoginHelpComponent implements OnInit, OnDestroy {
  public inputType = InputType;

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
