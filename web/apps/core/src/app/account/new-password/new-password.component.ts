import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InputType, ValidationDefinition, ValidationErrorType } from '@awdware/shared';

import { AccountService } from '@awdware/session';
import { ResetPasswordDto } from 'libs/session/src/lib/models/session-facade';

@Component({
  selector: 'awd-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  public inputType: typeof InputType = InputType;

  public resetPw = {} as ResetPasswordDto;
  public pwConf: string = '';
  public clickedButton = false;

  private readonly _accountService: AccountService;
  private readonly _activatedRoute: ActivatedRoute;

  @ViewChild('reset', { static: true }) private readonly _formElement?: NgForm;

  constructor(accountService: AccountService, activatedRoute: ActivatedRoute) {
    this._accountService = accountService;
    this._activatedRoute = activatedRoute;
  }

  public onSubmit() {
    const a = this._activatedRoute.snapshot.paramMap.get('token');
    if (!a) {
      throw new Error('No token found');
    }
    this.resetPw.token = a;
    return this._accountService.resetPassword(this.resetPw);
  }

  public get validationDefinitionPassword(): ValidationDefinition[] {
    return [
      {
        type: ValidationErrorType.TOO_SHORT,
        translationKey: 'account.register.form.password.validation.pattern'
      },
      {
        type: ValidationErrorType.PATTERN_MISMATCH,
        translationKey: 'account.register.form.password.validation.pattern'
      }
    ];
  }

  public get validationDefinitionPassword2(): ValidationDefinition[] {
    return [
      {
        type: ValidationErrorType.EQUALITY_MISMATCH,
        translationKey: 'account.register.form.password2.validation.equality'
      }
    ];
  }

  public get resetDisabled(): boolean | undefined {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
    return undefined;
  }
}
