import { Component, OnInit, Input } from '@angular/core';
import { LedEffectProperty } from '../../models/led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { LedEffectNumberProperty } from '../../models/led-effect-number-property.model';
import { InvalidOperationError } from 'src/app/models/invalid-operation-error';
import { LedEffectBoolProperty } from '../../models/led-effect-bool-property.model';
import { LedEffectColorProperty } from '../../models/led-effect-color-property.model';

@Component({
  selector: 'awd-led-effect-property',
  templateUrl: './led-effect-property.component.html',
  styleUrls: ['./led-effect-property.component.scss']
})
export class LedEffectPropertyComponent implements OnInit {
  @Input() effectProperty: LedEffectProperty;
  effectType = LedEffectPropertyType;

  constructor(public theme: ThemeService) { }

  ngOnInit() {
  }

  public get numProp(): LedEffectNumberProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyType.NUMBER) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectNumberProperty;
  }
  public get boolProp(): LedEffectBoolProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyType.BOOL) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectBoolProperty;
  }
  public get colorProp(): LedEffectColorProperty {
    if (this.effectProperty.effectType !== LedEffectPropertyType.COLOR) {
      throw new InvalidOperationError('Invalid cast');
    }
    return this.effectProperty as LedEffectColorProperty;
  }
}
