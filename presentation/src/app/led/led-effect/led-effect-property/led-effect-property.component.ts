import { Component, OnInit, Input } from '@angular/core';
import { LedEffectProperty } from '../../models/led-effect-property.model';
import { LedEffectPropertyType } from 'src/app/models/application-facade';
import { ThemeService } from 'src/app/shared/services/theme.service';

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
}
