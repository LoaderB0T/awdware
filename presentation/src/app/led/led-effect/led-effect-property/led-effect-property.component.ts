import { Component, OnInit, Input } from '@angular/core';
import { LedEffectProperty } from '../../models/led-effect-property.model';

@Component({
  selector: 'awd-led-effect-property',
  templateUrl: './led-effect-property.component.html',
  styleUrls: ['./led-effect-property.component.scss']
})
export class LedEffectPropertyComponent implements OnInit {
  @Input() effectProperty: LedEffectProperty;

  constructor() { }

  ngOnInit() {
  }

}
