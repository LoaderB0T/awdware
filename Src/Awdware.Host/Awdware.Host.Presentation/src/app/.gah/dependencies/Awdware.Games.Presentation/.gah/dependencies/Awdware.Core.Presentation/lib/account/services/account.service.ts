import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WebApiService } from '@gah/Awdware.Shared.Presentation/public-api';

import { SessionStoreService } from '../../services/session-store.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  UserDetailsDto,
  LoginResult,
  RegisterResult,
  LoginHelpRequestDto,
  ResetPasswordDto
} from '../../models/application-facade';
import { RegisterRequestDto, RegisterResponseDto } from '../../models/application-facade';
import { EventService } from '../../services/event.service';
import { ToolbarInvalidatedEvent } from '../../events/toolbar-invalidated.event';
import { SessionService } from '../../services/session.service';
import { RoutingService } from '../../services/routing.service';
import { UserDetailsService } from '../../services/user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _routingService: RoutingService;
  private _webApiService: WebApiService;
  private _sessionStoreService: SessionStoreService;
  private _eventService: EventService;
  private _sessionService: SessionService;
  private _userInfoService: UserDetailsService;

  constructor(
    webApiService: WebApiService,
    sessionStoreService: SessionStoreService,
    eventService: EventService,
    sessionService: SessionService,
    routingService: RoutingService,
    userInfoService: UserDetailsService
  ) {
    this._webApiService = webApiService;
    this._sessionStoreService = sessionStoreService;
    this._eventService = eventService;
    this._sessionService = sessionService;
    this._routingService = routingService;
    this._userInfoService = userInfoService;
  }

  public login(loginRequestDto: LoginRequestDto): Observable<LoginResult> {
    return this._webApiService.post<LoginResponseDto>('authentication/login', loginRequestDto)
      .pipe(
        map(
          data => {
            if (data.loginSuccess === LoginResult.SUCCESS) {
              this._sessionStoreService.putToken(data.token);
              this._sessionService.startCheckSession();
              console.log(data);
              this._userInfoService.setUser(data.userInfo);
              this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
              return LoginResult.SUCCESS;
            } else {
              return data.loginSuccess;
            }
          })
      );
  }

  public register(registerRequestDto: RegisterRequestDto): Observable<RegisterResult> {
    return this._webApiService.post<RegisterResponseDto>('authentication/register', registerRequestDto)
      .pipe(
        map(data => {
          if (data.registerSuccess === RegisterResult.SUCCESS) {
            this._sessionStoreService.putToken(data.token);
            this._sessionService.startCheckSession();
            this._userInfoService.setUser(data.userInfo);
            this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
            return RegisterResult.SUCCESS;
          } else {
            return data.registerSuccess;
          }
        })
      );
  }

  public resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void> {
    return this._webApiService.post<void>('authentication/resetpassword', resetPasswordDto);
  }

  public loginHelp(loginHelpRequestDto: LoginHelpRequestDto): Observable<void> {
    return this._webApiService.post<void>('authentication/loginhelp', loginHelpRequestDto);
  }

  public loadUserDetails(): Observable<UserDetailsDto> {
    return this._webApiService.get<UserDetailsDto>('user/getMyUserDetails')
      .pipe(
        tap(x => {
          this._userInfoService.setUser(x);
          this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
        })
      );
  }

  public logout() {
    this._sessionStoreService.removeToken();
    this._sessionService.stopCheckSession();
    this._userInfoService.clearUser();
    this._eventService.publishEvent<ToolbarInvalidatedEvent>(ToolbarInvalidatedEvent);
    this._routingService.navigateToHomeHello();
  }

  public verifyMail(token: string): Observable<void> {
    return this._webApiService.get('authentication/emailconfirmation/' + token);
  }

}
