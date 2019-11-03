import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LedEffectProperty } from '../../models/led-effect-property.model';
import { LedEffectPropertyKind } from 'src/app/models/application-facade';
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
  @Output() valueChanged = new EventEmitter<any>();
  effectType = LedEffectPropertyKind;

  constructor(public theme: ThemeService) { }

  ngOnInit() {
  }

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
}