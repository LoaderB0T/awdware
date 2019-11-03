import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from 'src/app/models/application-facade';

export class LedEffectNumberProperty extends LedEffectProperty {
  public minVal: number;
  public maxVal: number;

  constructor(id: number, name: string, value: any, minValue: number, maxValue: number) {
    super(id, name, LedEffectPropertyKind.NUMBER, value);
    this.minVal = minValue;
    this.maxVal = maxValue;
  }
}
