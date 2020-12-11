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
