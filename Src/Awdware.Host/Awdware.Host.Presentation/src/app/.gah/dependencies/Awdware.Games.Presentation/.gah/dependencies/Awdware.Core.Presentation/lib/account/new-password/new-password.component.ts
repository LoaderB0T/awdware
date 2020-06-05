import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { InputType, ValidationDefinition, ValidationErrorType } from '@gah/Awdware.Shared.Presentation/public-api';

import { AccountService } from '../services/account.service';
import { ResetPasswordDto } from '../../models/application-facade';


@Component({
  selector: 'awd-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  public inputType: typeof InputType = InputType;

  public resetPw = new ResetPasswordDto();
  public pwConf: string;
  public clickedButton = false;

  private _accountService: AccountService;
  private _activatedRoute: ActivatedRoute;

  @ViewChild('reset', { static: true }) private _formElement: NgForm;

  constructor(accountService: AccountService, activatedRoute: ActivatedRoute) {
    this._accountService = accountService;
    this._activatedRoute = activatedRoute;
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  public onSubmit() {
    const a = this._activatedRoute.snapshot.paramMap.get('token');
    this.resetPw.token = a;
    return this._accountService.resetPassword(this.resetPw).subscribe(x => {
    });
  }

  public get validationDefinitionPassword(): ValidationDefinition[] {
    return [{
      type: ValidationErrorType.TOO_SHORT,
      translationKey: 'account.register.form.password.validation.pattern'
    },
    {
      type: ValidationErrorType.PATTERN_MISMATCH,
      translationKey: 'account.register.form.password.validation.pattern'
    }];
  }

  public get validationDefinitionPassword2(): ValidationDefinition[] {
    return [{
      type: ValidationErrorType.EQUALITY_MISMATCH,
      translationKey: 'account.register.form.password2.validation.equality'
    }];
  }

  public get resetDisabled(): boolean {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
  }

}
