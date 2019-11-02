import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';

export class LedEffectNumberProperty extends LedEffectProperty {
  public minVal: number;
  public maxVal: number;

  constructor(id: number, name: string, effectType: LedEffectPropertyType, value: any, minValue: number, maxValue: number) {
    super(id, name, effectType, value);
    this.minVal = minValue;
    this.maxVal = maxValue;
  }
}
