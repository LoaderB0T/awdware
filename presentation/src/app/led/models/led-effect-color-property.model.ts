import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';

export class LedEffectColorProperty extends LedEffectProperty {
  constructor(effectType: LedEffectPropertyType, value: any) {
    super(effectType, value);
  }
}
