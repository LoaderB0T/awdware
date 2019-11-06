import { Component, OnInit } from '@angular/core';
import { LedService } from './services/led.service';
import { LedEffectKind } from '../models/application-facade';
import { DownloadService } from '../shared/services/download.service';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _ledService: LedService;
  private _downloadService: DownloadService;
  public ledEffectKind = LedEffectKind;
  public selectedAddEffect: LedEffectKind;
  public addDialogVisible: boolean;
  public addEffectName: string;

  constructor(
    ledService: LedService,
    downloadService: DownloadService
  ) {
    this._ledService = ledService;
    this._downloadService = downloadService;
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

  public getConfigFile() {
    this._ledService.getConfigFile().subscribe(config => {
      this._downloadService.downloadStringAsFile('config.led', config);
    });
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
