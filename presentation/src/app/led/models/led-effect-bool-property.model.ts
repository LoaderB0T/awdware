import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from 'src/app/models/application-facade';

export class LedEffectBoolProperty extends LedEffectProperty {

  constructor(id: number, name: string, value: boolean) {
    super(id, name, LedEffectPropertyKind.BOOL, value);
  }
}
