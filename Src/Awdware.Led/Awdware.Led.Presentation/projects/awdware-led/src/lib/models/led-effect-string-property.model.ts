import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectPropertyKind } from './application-facade';

export class LedEffectStringProperty extends LedEffectProperty {
  constructor(id: number, name: string, value: string) {
    super(id, name, LedEffectPropertyKind.STRING, value);
  }
}
