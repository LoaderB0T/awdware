import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from './application-facade';

export class LedEffectNumberProperty extends LedEffectProperty {
  public minVal: number;
  public maxVal: number;

  constructor(id: number, name: string, value: number, minValue?: number, maxValue?: number) {
    super(id, name, LedEffectPropertyKind.NUMBER, value);
    this.minVal = minValue ?? 0;
    this.maxVal = maxValue ?? 100;
  }
}
