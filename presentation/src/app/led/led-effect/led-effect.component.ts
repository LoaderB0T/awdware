import { Component, OnInit, Input } from '@angular/core';
import { LedConfig } from '../models/led-config.model';

@Component({
  selector: 'awd-led-effect',
  templateUrl: './led-effect.component.html',
  styleUrls: ['./led-effect.component.scss']
})
export class LedEffectComponent implements OnInit {
  @Input() effect: LedConfig;
  constructor() { }

  ngOnInit() {
  }

}
