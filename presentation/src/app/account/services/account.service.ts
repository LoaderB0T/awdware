import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service';
import { SessionStoreService } from 'src/app/services/session-store.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  UserInfoDto,
  LoginResult,
  RegisterResult,
  LoginHelpRequestDto,
  ResetPasswordDto
} from 'src/app/models/application-facade';
import { Observable } from 'rxjs';
import { RegisterRequestDto, RegisterResponseDto } from '../../models/application-facade';
import { map, tap } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { ToolbarInvalidated } from 'src/app/events/toolbar-invalidated.event';
import { SessionService } from 'src/app/services/session.service';
import { RoutingService } from 'src/app/services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _userInfo: UserInfoDto;
  private _routingService: RoutingService;
  constructor(
    private webApiService: WebApiService,
    private sessionStoreService: SessionStoreService,
    private eventService: EventService,
    private sessionService: SessionService,
    routingService: RoutingService
  ) {
    this._routingService = routingService;
  }

  public login(loginRequestDto: LoginRequestDto): Observable<LoginResult> {
    return this.webApiService.post<LoginResponseDto>('authentication/login', loginRequestDto)
      .pipe(
        map(
          data => {
            if (data.loginSuccess === LoginResult.SUCCESS) {
              this.sessionStoreService.putToken(data.token);
              this.sessionService.startCheckSession();
              console.log(data);
              this._userInfo = data.userInfo;
              this.eventService.publishEvent<ToolbarInvalidated>(ToolbarInvalidated);
              return LoginResult.SUCCESS;
            } else {
              return data.loginSuccess;
            }
          })
      );
  }

  public register(registerRequestDto: RegisterRequestDto): Observable<RegisterResult> {
    return this.webApiService.post<RegisterResponseDto>('authentication/register', registerRequestDto)
      .pipe(
        map(data => {
          if (data.registerSuccess === RegisterResult.SUCCESS) {
            this.sessionStoreService.putToken(data.token);
            this.sessionService.startCheckSession();
            this._userInfo = data.userInfo;
            this.eventService.publishEvent<ToolbarInvalidated>(ToolbarInvalidated);
            return RegisterResult.SUCCESS;
          } else {
            return data.registerSuccess;
          }
        })
      );
  }

  public resetPassword(resetPasswordDto: ResetPasswordDto): Observable<void> {
    return this.webApiService.post<void>('authentication/resetpassword', resetPasswordDto);
  }

  public loginHelp(loginHelpRequestDto: LoginHelpRequestDto): Observable<void> {
    return this.webApiService.post<void>('authentication/loginhelp', loginHelpRequestDto);
  }

  public loadUserInfo(userId: string): Observable<UserInfoDto> {
    return this.webApiService.get<UserInfoDto>('user/getMyUserInfo')
      .pipe(
        tap(x => {
          this._userInfo = x;
          this.eventService.publishEvent<ToolbarInvalidated>(ToolbarInvalidated);
        })
      );
  }

  public get userInfo(): UserInfoDto {
    return this._userInfo;
  }

  public logout() {
    this.sessionStoreService.removeToken();
    this.sessionService.stopCheckSession();
    this._userInfo = null;
    this.eventService.publishEvent<ToolbarInvalidated>(ToolbarInvalidated);
    this._routingService.navigateToHomeHello();
  }

  public verifyMail(token: string): Observable<void> {
    return this.webApiService.get('authentication/emailconfirmation/' + token);
  }

}
