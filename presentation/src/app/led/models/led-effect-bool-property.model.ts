import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';

export class LedEffectBoolProperty extends LedEffectProperty {

  constructor(id: number, name: string, effectType: LedEffectPropertyType, value: any) {
    super(id, name, effectType, value);
  }
}
