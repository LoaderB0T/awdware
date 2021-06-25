import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InvalidOperationError, ThemeService } from '@awdware/shared';

import { LedEffectProperty } from '../../models/led-effect-property.model';
import { LedEffectNumberProperty } from '../../models/led-effect-number-property.model';
import { LedEffectBoolProperty } from '../../models/led-effect-bool-property.model';
import { LedEffectColorProperty } from '../../models/led-effect-color-property.model';
import { LedEffectStringProperty } from '../../models/led-effect-string-property.model';
import { LedEffectPropertyKind } from '../../models/application-facade';

@Component({
  selector: 'awd-led-effect-property',
  templateUrl: './led-effect-property.component.html',
  styleUrls: ['./led-effect-property.component.scss']
})
export class LedEffectPropertyComponent {
  @Input() effectProperty: LedEffectProperty;
  @Output() valueChanged = new EventEmitter<any>();
  effectType = LedEffectPropertyKind;

  constructor(public theme: ThemeService) {}

  public madeChanges(evt: any) {
    this.valueChanged.next(evt);
  }

  public get numProp(): LedEffectNumberProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyKind.NUMBER) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectNumberProperty;
  }
  public get boolProp(): LedEffectBoolProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyKind.BOOL) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectBoolProperty;
  }
  public get colorProp(): LedEffectColorProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyKind.COLOR) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectColorProperty;
  }
  public get stringProp(): LedEffectStringProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyKind.STRING) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectStringProperty;
  }
}
