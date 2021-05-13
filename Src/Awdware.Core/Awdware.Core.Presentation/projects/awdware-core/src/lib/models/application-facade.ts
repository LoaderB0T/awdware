export interface LoginHelpRequestDto {
  email: string;
  forgotUsername: boolean;
  forgotPassword: boolean;
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  loginSuccess: LoginResult;
  userInfo: UserDetailsDto;
  token: string;
}

export interface RegisterRequestDto {
  username: string;
  password: string;
  password2: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface RegisterResponseDto {
  registerSuccess: RegisterResult;
  userInfo: UserDetailsDto;
  token: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface TokenDto {
  token: string;
}

export interface UserDetailsDto {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  permission: UserPermission;
}

export interface UserInfoDto {
  id: string;
  username: string;
}

export enum ConfirmEmailStatus {
  UNKNOWN = 0,
  UNKNOWN_LINK = 1,
  EXPIRED_LINK = 2,
  SUCCESS = 3
}

export enum LoginResult {
  UNKNOWN = 0,
  SUCCESS = 1,
  WRONG_USERNAME = 2,
  WRONG_PASSWORD = 3
}

export enum RegisterResult {
  UNKNOWN = 0,
  SUCCESS = 1,
  USERNAME_TAKEN = 2,
  EMAIL_TAKEN = 3,
  PASSWORD_MISMATCH = 4,
  MISSING_INFORMATION = 5
}

export enum PasswordResetStatus {
  ERROR = 0,
  SUCCESS = 1
}

export enum UserPermission {
  UNKNOWN = 0,
  USER = 1,
  MODERATOR = 2,
  ADMIN = 3,
  OPERATOR = 4
}
