import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { UserInfo } from '../models/user-info';
import { LedService } from './services/led.service';
import { LedEffect } from './models/led-config.model';
import { LedEffectProperty } from './models/led-effect-property.model';
import { LedEffectPropertyKind, LedEffectKind } from '../models/application-facade';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _ledService: LedService;
  public ledEffectKind = LedEffectKind;
  public selectedAddEffect: LedEffectKind;
  public addDialogVisible: boolean;
  public addEffectName: string;

  constructor(ledService: LedService) {
    this._ledService = ledService;
  }

  ngOnInit() {
    this._ledService.getEffetcs().subscribe();
  }

  public get ledConfigs() {
    return this._ledService.ledEffects;
  }

  public showAddDialog() {
    this.addEffectName = '';
    this.selectedAddEffect = null;
    this.addDialogVisible = true;
  }

  public selectAddEffect(effect: LedEffectKind) {
    this.selectedAddEffect = effect;
  }

  public deleteEffect(id: string) {
    this._ledService.deleteEffect(id).subscribe();
    const index = this.ledConfigs.findIndex(x => x.id === id);
    this.ledConfigs.splice(index, 1);
  }

  public confirmAddEffect() {
    if (!this.canConfirmAddEffect) {
      return;
    }
    this.addDialogVisible = false;
    const newEffect = this._ledService.getNewEffect(this.selectedAddEffect, this.addEffectName);
    this.ledConfigs.push(newEffect);
    this._ledService.addEffect(newEffect).subscribe(effectId => {
      newEffect.id = effectId;
    });
  }

  public cancelAddEffect() {
    this.addDialogVisible = false;
  }

  public get canConfirmAddEffect(): boolean {
    return this.selectedAddEffect && this.addEffectName && this.addEffectName.length >= 2 && this.addEffectName.length <= 32;
  }
}
