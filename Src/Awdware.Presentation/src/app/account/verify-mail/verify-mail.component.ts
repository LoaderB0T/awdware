import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'awd-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit, OnDestroy {
  public verifyComplete: boolean = false;
  private _activatedRoute: ActivatedRoute;
  private _accountService: AccountService;

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

  ngOnDestroy() {

  }

}
