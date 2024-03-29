import { Component, Input } from '@angular/core';
import { LedEffect } from '../models/led-config.model';
import { LedService } from '../services/led.service';

@Component({
  selector: 'awd-led-effect',
  templateUrl: './led-effect.component.html',
  styleUrls: ['./led-effect.component.scss']
})
export class LedEffectComponent {
  @Input() effect!: LedEffect;

  private readonly _ledService: LedService;

  constructor(ledService: LedService) {
    this._ledService = ledService;
  }

  public madeChanges() {
    this.effect.hasPendingChanges = true;
  }

  public deleteEffect() {
    this._ledService.deleteEffect(this.effect.id);
  }

  public selectEffect() {
    this._ledService.selectEffect(this.effect.id);
  }

  public saveEffect() {
    this._ledService.updateEffect(this.effect);
    this.effect.hasPendingChanges = false;
  }
}
