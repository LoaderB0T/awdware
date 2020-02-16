import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from './application-facade';

export class LedEffectBoolProperty extends LedEffectProperty {

  constructor(id: number, name: string, value: boolean) {
    super(id, name, LedEffectPropertyKind.BOOL, value);
  }
}
