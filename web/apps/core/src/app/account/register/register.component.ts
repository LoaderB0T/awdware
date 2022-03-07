import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InputType, RoutingService, ValidationDefinition, ValidationErrorType } from '@awdware/shared';

import { AccountService } from '@awdware/session';
import { RegisterRequestDto, RegisterResult } from 'libs/session/src/lib/models/session-facade';

@Component({
  selector: 'awd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public inputType: typeof InputType = InputType;

  public errorMessageKey: string;
  public registerModel: RegisterRequestDto;
  public registerSuccessful: boolean = false;
  public clickedButton: boolean = false;

  private readonly _accountService: AccountService;
  private readonly _routingService: RoutingService;
  @ViewChild('register', { static: true })
  private readonly _formElement?: NgForm;

  constructor(accountService: AccountService, routingService: RoutingService) {
    this._accountService = accountService;
    this._routingService = routingService;
    this.errorMessageKey = '';
    this.registerModel = {} as RegisterRequestDto;
  }

  public onSubmit() {
    this.register();
  }

  private register() {
    this.clickedButton = true;
    this.errorMessageKey = '';
    this._accountService.register(this.registerModel).then(x => {
      if (x === RegisterResult.SUCCESS) {
        this.successfulRegister();
      } else {
        this.clickedButton = false;
        if (x === RegisterResult.EMAIL_TAKEN) {
          this.errorMessageKey = 'takenEmail';
        } else if (x === RegisterResult.USERNAME_TAKEN) {
          this.errorMessageKey = 'takenUsername';
        } else {
          this.errorMessageKey = 'unknown';
        }
      }
    });
  }

  private successfulRegister() {
    this.registerSuccessful = true;
    this._routingService.navigateToHomeHello();
  }

  public get registerDisabled(): boolean | undefined {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
    return undefined;
  }

  public get validationDefinitionEmail(): ValidationDefinition[] {
    return [
      {
        type: ValidationErrorType.PATTERN_MISMATCH,
        translationKey: 'account.register.form.email.validation.invalidmail'
      }
    ];
  }

  public get validationDefinitionUsername(): ValidationDefinition[] {
    return [
      {
        type: ValidationErrorType.TOO_SHORT,
        translationKey: 'account.register.form.username.validation.tooshort'
      },
      {
        type: ValidationErrorType.TOO_LONG,
        translationKey: 'account.register.form.username.validation.toolong'
      },
      {
        type: ValidationErrorType.PATTERN_MISMATCH,
        translationKey: 'account.register.form.username.validation.pattern'
      }
    ];
  }

  public get validationDefinitionPassword(): ValidationDefinition[] {
    return [
      {
        type: ValidationErrorType.TOO_SHORT,
        translationKey: 'account.register.form.password.validation.tooshort'
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
}
