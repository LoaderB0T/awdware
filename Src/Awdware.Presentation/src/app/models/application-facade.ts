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
  public userInfo: UserDetailsDto;
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
  public userInfo: UserDetailsDto;
  public token: string;
}

export class ResetPasswordDto {
  public token: string;
  public newPassword: string;
}

export class TokenDto {
  public token: string;
}

export class UserDetailsDto {
  public userId: string;
  public username: string;
  public firstname: string;
  public lastname: string;
  public email: string;
}

export class UserInfoDto {
  public id: string;
  public username: string;
}

export enum ConfirmEmailStatus {
  UNKNOWN = 0,
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

export class LedConfigFileDto {
  public serverHost: string;
  public serverPort: number;
  public serverUseHttps: boolean;
  public userId: string;
  public configName: string;
  public comPortName: string;
  public id: string;
}

export class LedConfigurationDto {
  public id: string;
  public name: string;
  public ordinal: number;
  public userId: string;
  public ledEffect: LedEffectDto;
}

export class LedEffectDto {
  public effectKind: LedEffectKind;
  public properties: Array<LedEffectPropertyDto>;
}

export enum LedEffectKind {
  UNKNOWN = 0,
  MIX = 1,
  STRIPE = 2,
  STATIC = 3,
  PIXEL = 4,
  MUSIC = 5,
  WEB = 6
}

export enum LedEffectPropertyKind {
  UNKNOWN = 0,
  COLOR = 1,
  NUMBER = 2,
  BOOL = 3,
  STRING = 4
}

export class LedEffectPropertyDto {
  public id: number;
  public name: string;
  public effectType: LedEffectPropertyKind;
  public value: string;
  public minValue?: number;
  public maxValue?: number;
}

export class LedImageDto {
  public leds: RgbColorDto;
  public transitionTime: number;
}

export class LedSettingsDto {
  public userId: string;
  public settingName: string;
  public comPortName: string;
  public id: string;
}

export class RgbColorDto {
  public r: number;
  public g: number;
  public b: number;
}

export class GameLobbyInformationDto {
  public id: string;
  public name: string;
  public players: Array<GamePlayerDto>;
}

export class GamePlayerDto {
  public id: string;
  public name: string;
  public lobbyOwner: boolean;
}

export enum PushyColor {
  UNKNOWN = 0,
  RED = 1,
  BLUE = 2,
  GREEN = 3,
  YELLOW = 4
}

export class PushyFieldDto {
  public squares: Array<Array<PushySquareDto>>;
}

export class PushyFigureDto {
  public userId: string;
}

export class PushySquareDto {
  public squareType: PushySquareType;
  public childSquares: Array<PushySquareDto>;
  public figures: Array<PushyFigureDto>;
  public color?: PushyColor;
}

export enum PushySquareType {
  UNKNOWN = 0,
  AIR = 1,
  WALL = 2
}
