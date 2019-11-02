import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';

export class LedEffectNumberProperty extends LedEffectProperty {
  public minVal: number;
  public maxVal: number;

  constructor(effectType: LedEffectPropertyType, value: any, minValue: number, maxValue: number) {
    super(effectType, value);
    this.minVal = minValue;
    this.maxVal = maxValue;
  }
}
