import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private _router: Router;
  private _returnUrl: string;

  constructor(router: Router, route: ActivatedRoute) {
    this._router = router;
    route.queryParams
      .subscribe(params => this._returnUrl = params.returnUrl);
  }

  public navigateToHomeLanding() {
    this._router.navigate(['']);
  }

  public navigateToHomeHello() {
    this._router.navigate(['hello']);
  }

  public navigateToAccountLogin(returnUrl: string = null) {
    if (returnUrl) {
      this._router.navigate(['account', 'login'], { queryParams: { returnUrl } });
    } else {
      this._router.navigate(['account', 'login']);
    }
  }

  public navigateAfterLoggin() {
    if (this._returnUrl) {
      this._router.navigate([this._returnUrl]);
    } else {
      this.navigateToHomeHello();
    }
  }

  public navigateToAccountRegister() {
    this._router.navigate(['account', 'register']);
  }

  public navigateToAccountHelp() {
    this._router.navigate(['account', 'help']);
  }

  public navigateToAccount() {
    this._router.navigate(['me']);
  }

  public navigateToVote() {
    this._router.navigate(['vote']);
  }

  public navigateToMyVotes() {
    this._router.navigate(['vote', 'my']);
  }

  public navigateToNewVote() {
    this._router.navigate(['vote', 'new']);
  }

  public navigateToLed() {
    this._router.navigate(['led']);
  }

  public navigateToGames(): void {
    this._router.navigate(['games', 'home']);
  }

  public navigateToGamesPushy() {
    this._router.navigate(['games', 'pushy']);
  }
  public navigateToGamesPushyLobby() {
    this._router.navigate(['games', 'pushy', 'lobby']);
  }
}
