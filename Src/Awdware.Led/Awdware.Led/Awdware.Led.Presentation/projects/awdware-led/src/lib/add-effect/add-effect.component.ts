import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BaseDialog } from '@gah/Awdware.Shared.Presentation/public-api';

import { LedService } from '../services/led.service';
import { LedEffect } from '../models/led-config.model';
import { LedEffectKind } from '../models/application-facade';

@Component({
  selector: 'awd-add-effect',
  templateUrl: './add-effect.component.html',
  styleUrls: ['./add-effect.component.scss']
})
export class AddEffectComponent extends BaseDialog implements OnInit {
  LedEffectKind: typeof LedEffectKind = LedEffectKind;
  private _ledService: LedService;
  public selectedAddEffect: LedEffectKind;
  public addEffectName: string;

  constructor(ledService: LedService) {
    super();
    this._ledService = ledService;
  }

  @Output() effectAdded = new EventEmitter<LedEffect>();

  ngOnInit() {
  }

  public confirmAddEffect() {
    if (!this.canConfirmAddEffect) {
      return;
    }
    const newEffect = this._ledService.getNewEffect(this.selectedAddEffect, this.addEffectName);
    this.effectAdded.emit(newEffect);
    this._ledService.addEffect(newEffect).subscribe(effectId => {
      newEffect.id = effectId;
    });
    this.$closeDialog.next();
  }

  public cancelAddEffect() {
    this.$closeDialog.next();
  }

  public get canConfirmAddEffect(): boolean {
    return this.selectedAddEffect && this.addEffectName && this.addEffectName.length >= 2 && this.addEffectName.length <= 32;
  }

  public selectAddEffect(effect: LedEffectKind) {
    this.selectedAddEffect = effect;
  }
}
