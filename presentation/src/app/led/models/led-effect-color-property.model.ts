import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from 'src/app/models/application-facade';

export class LedEffectColorProperty extends LedEffectProperty {

  constructor(id: number, name: string, value: string) {
    super(id, name, LedEffectPropertyKind.COLOR, value);
  }
}
