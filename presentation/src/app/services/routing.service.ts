import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public navigateToHomeLanding() {
    this.router.navigate(['']);
  }

  public navigateToHomeHello() {
    this.router.navigate(['hello']);
  }

  public navigateToAccountLogin(returnAfterLogin: boolean = false) {
    if (returnAfterLogin) {
      this.router.navigate(['account', 'login'], { queryParams: { returnUrl: this.router.url } });
    } else {
      this.router.navigate(['account', 'login']);
    }
  }

  public navigateToAccountRegister() {
    this.router.navigate(['account', 'register']);
  }

  public navigateToAccountHelp() {
    this.router.navigate(['account', 'help']);
  }

  public navigateToAccount() {
    this.router.navigate(['me']);
  }
}
