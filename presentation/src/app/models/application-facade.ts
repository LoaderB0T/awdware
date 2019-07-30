export class LoginHelpRequestDto {
  public email: string;
  public forgotUsername: boolean;
  public forgotPassword: boolean;
}

export class LoginRequestDto {
  public username: string;
  public password: string;
}

export class LoginResponseDto {
  public loginSuccess: LoginResult;
  public userInfo: UserInfoDto;
  public token: string;
}

export class RegisterRequestDto {
  public username: string;
  public password: string;
  public password2: string;
  public email: string;
  public firstname: string;
  public lastname: string;
}

export class RegisterResponseDto {
  public registerSuccess: RegisterResult;
  public userInfo: UserInfoDto;
  public token: string;
}

export class ResetPasswordDto {
  public token: string;
  public newPassword: string;
}

export class TokenDto {
  public token: string;
}

export class UserInfoDto {
  public userId: string;
  public username: string;
  public firstname: string;
  public lastname: string;
  public email: string;
}

export enum ConfirmEmailStatus {
  UNKNOWN_LINK = 0,
  EXPIRED_LINK = 1,
  SUCCESS = 3
}

export enum LoginResult {
  UNKNOWN = 0,
  SUCCESS = 1,
  WRONG_USERNAME = 2,
  WRONG_PASSWORD = 3
}

export enum PasswordResetStatus {
  NO_SUCCESS = 0,
  SUCCESS = 1
}

export enum RegisterResult {
  UNKNOWN = 0,
  SUCCESS = 1,
  USERNAME_TAKEN = 2,
  EMAIL_TAKEN = 3,
  PASSWORDS_NOT_MATCHING = 4,
  MISSING_INFORMATION = 5
}
