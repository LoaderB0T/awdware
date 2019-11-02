import { LedEffectPropertyType } from 'src/app/models/application-facade';

export abstract class LedEffectProperty {
  public effectType: LedEffectPropertyType;
  public value: any;

  constructor(effectType: LedEffectPropertyType, value: any) {
    this.effectType = effectType;
    this.value = value;
  }
}
