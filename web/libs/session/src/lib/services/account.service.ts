import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RoutingService, WebApiService } from '@awdware/shared';
import { UserDetailsService } from './user-details.service';
import { SessionService } from './session.service';
import { SessionStoreService } from './session-store.service';
import {
  LoginHelpRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  LoginResult,
  RegisterRequestDto,
  RegisterResponseDto,
  RegisterResult,
  ResetPasswordDto,
  UserDetailsDto
} from '../models/session-facade';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly _routingService: RoutingService;
  private readonly _webApiService: WebApiService;
  private readonly _sessionStoreService: SessionStoreService;
  private readonly _sessionService: SessionService;
  private readonly _userInfoService: UserDetailsService;

  constructor(
    webApiService: WebApiService,
    sessionStoreService: SessionStoreService,
    sessionService: SessionService,
    routingService: RoutingService,
    userInfoService: UserDetailsService
  ) {
    this._webApiService = webApiService;
    this._sessionStoreService = sessionStoreService;
    this._sessionService = sessionService;
    this._routingService = routingService;
    this._userInfoService = userInfoService;
  }

  public login(loginRequestDto: LoginRequestDto): Promise<LoginResult> {
    return this._webApiService.post<LoginResponseDto>('authentication/login', loginRequestDto).then(data => {
      if (data.loginSuccess === LoginResult.SUCCESS) {
        this._sessionStoreService.putToken(data.token);
        this._sessionService.startCheckSession();
        console.log(data);
        this._userInfoService.setUser(data.userInfo);
        return LoginResult.SUCCESS;
      } else {
        return data.loginSuccess;
      }
    });
  }

  public register(registerRequestDto: RegisterRequestDto): Promise<RegisterResult> {
    return this._webApiService.post<RegisterResponseDto>('authentication/register', registerRequestDto).then(data => {
      if (data.registerSuccess === RegisterResult.SUCCESS) {
        this._sessionStoreService.putToken(data.token);
        this._sessionService.startCheckSession();
        this._userInfoService.setUser(data.userInfo);
        return RegisterResult.SUCCESS;
      } else {
        return data.registerSuccess;
      }
    });
  }

  public resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this._webApiService.post<void>('authentication/resetpassword', resetPasswordDto);
  }

  public loginHelp(loginHelpRequestDto: LoginHelpRequestDto): Promise<void> {
    return this._webApiService.post<void>('authentication/loginhelp', loginHelpRequestDto);
  }

  public async loadUserDetails(): Promise<UserDetailsDto | null> {
    const x = await this._webApiService.get<UserDetailsDto>('user/getMyUserDetails');
    if (x) {
      this._userInfoService.setUser(x);
      return x;
    } else {
      this._userInfoService.clearUser();
      this._sessionStoreService.removeToken();
      this._sessionService.stopCheckSession();
      return null;
    }
  }

  public logout() {
    this._sessionStoreService.removeToken();
    this._sessionService.stopCheckSession();
    this._userInfoService.clearUser();
    this._routingService.navigateToHomeHello();
  }

  public verifyMail(token: string): Promise<void> {
    return this._webApiService.get(`authentication/emailconfirmation/${token}`);
  }
}
