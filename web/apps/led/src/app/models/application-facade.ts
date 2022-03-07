export interface LedConfigFileDto {
  serverHost: string;
  serverPort: number;
  serverUseHttps: boolean;
  userId: string;
  configName: string;
  comPortName: string;
  id: string;
}

export interface LedConfigurationDto {
  id: string;
  name: string;
  ordinal: number;
  userId: string;
  ledEffect: LedEffectDto;
}

export interface LedEffectDto {
  effectKind: LedEffectKind;
  properties: Array<LedEffectPropertyDto>;
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

export interface LedEffectPropertyDto {
  id: number;
  name: string;
  effectType: LedEffectPropertyKind;
  value: string;
  minValue?: number;
  maxValue?: number;
}

export interface LedImageDto {
  leds: RgbColorDto;
  transitionTime: number;
}

export interface LedSettingsDto {
  userId: string;
  settingName: string;
  comPortName: string;
  id: string;
}

export interface RgbColorDto {
  r: number;
  g: number;
  b: number;
}
