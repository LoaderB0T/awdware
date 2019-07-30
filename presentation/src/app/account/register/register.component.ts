import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InputType } from 'src/app/shared/models/input-type';
import { AccountService } from '../services/account.service';
import { SubscriptionManager } from 'src/app/shared/models/subscription-manager';
import { RegisterRequestDto, RegisterResult } from 'src/app/models/application-facade';
import { RoutingService } from 'src/app/services/routing.service';
import { ValidationDefinition } from 'src/app/shared/models/validation-definition';
import { ValidationErrorType } from 'src/app/shared/models/validation-error-type';

@Component({
  selector: 'awd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public inputType = InputType;

  public errorMessageKey: string;
  public registerModel: RegisterRequestDto;
  public registerSuccessful: boolean = false;
  public clickedButton: boolean = false;

  private _subMgr = new SubscriptionManager();
  private _accountService: AccountService;
  private _routingService: RoutingService;
  private _formElement: NgForm;
  @ViewChild('register', { static: true })
  formElement: NgForm;

  constructor(accountService: AccountService, routingService: RoutingService) {
    this._accountService = accountService;
    this._routingService = routingService;
    this.errorMessageKey = '';
    this.registerModel = new RegisterRequestDto();
  }

  public ngOnInit() {

  }

  public onSubmit() {
    this.register();
  }

  public ngOnDestroy() {
    this._subMgr.unsubscribeAll();
  }

  private register() {
    this.clickedButton = true;
    this.errorMessageKey = '';
    const registerSub = this._accountService.register(this.registerModel).subscribe(x => {
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
    this._subMgr.add(registerSub);
  }

  private successfulRegister() {
    this.registerSuccessful = true;
    this._routingService.navigateToHomeHello();
  }

  public get registerDisabled(): boolean {
    if (this.clickedButton) {
      return true;
    }

    if (this._formElement) {
      return !this._formElement.valid;
    }
  }


  public get validationDefinitionEmail(): ValidationDefinition[] {
    return [{
      type: ValidationErrorType.PATTERN_MISMATCH,
      translationKey: 'account.register.form.email.validation.invalidmail'
    }];
  }

  public get validationDefinitionUsername(): ValidationDefinition[] {
    return [{
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
    }];
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
}
