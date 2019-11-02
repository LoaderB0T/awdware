import { LedEffectPropertyType } from 'src/app/models/application-facade';

export abstract class LedEffectProperty {
  public id: number;
  public name: string;
  public effectType: LedEffectPropertyType;
  public value: any;

  constructor(id: number, name: string, effectType: LedEffectPropertyType, value: any) {
    this.id = id;
    this.name = name;
    this.effectType = effectType;
    this.value = value;
  }
}
