import { LedEffectPropertyKind } from './application-facade';

export abstract class LedEffectProperty {
  public id: number;
  public name: string;
  public effectType: LedEffectPropertyKind;
  public value: any;

  constructor(id: number, name: string, effectType: LedEffectPropertyKind, value: any) {
    this.id = id;
    this.name = name;
    this.effectType = effectType;
    this.value = value;
  }
}
