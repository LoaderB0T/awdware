import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../services/account.service';

@Component({
  selector: 'awd-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit, OnDestroy {
  public verifyComplete = false;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _accountService: AccountService;

  constructor(accountService: AccountService, activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
    this._accountService = accountService;
  }

  ngOnInit() {
    const a = this._activatedRoute.snapshot.paramMap.get('token');
    this._accountService.verifyMail(a).subscribe(() => {
      this.verifyComplete = true;
    });
  }

  ngOnDestroy() {}
}
