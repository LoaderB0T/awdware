import { Component, OnInit } from '@angular/core';
import { LedService } from './services/led.service';
import { LedEffectKind } from '../models/application-facade';
import { DownloadService } from '../shared/services/download.service';
import { DialogService } from '../shared/services/dialog.service';
import { Dialog, DialogRow, DialogElementType, DialogElement, DialogElementTextBox, DialogElementText, DialogElementButton } from '../shared/models/dialog.model';
import { InputType } from '../shared/models/input-type';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _ledService: LedService;
  private _downloadService: DownloadService;
  private _dialogService: DialogService;
  private _configSaved = false;
  public ledEffectKind = LedEffectKind;
  public selectedAddEffect: LedEffectKind;
  public addDialogVisible: boolean;
  public addEffectName: string;

  constructor(
    ledService: LedService,
    downloadService: DownloadService,
    dialogService: DialogService
  ) {
    this._ledService = ledService;
    this._downloadService = downloadService;
    this._dialogService = dialogService;
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

  public showSettingsDialog() {

    const dialog = new Dialog();
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());

    dialog.rows[0].elements.push(
      new DialogElementText('This is a description')
    );

    const ledCountTextbox = new DialogElementTextBox('Led Count', '');
    ledCountTextbox.constraint = InputType.NUMERIC;
    ledCountTextbox.minValue = 5;
    ledCountTextbox.maxValue = 600;
    dialog.rows[1].elements.push(
      ledCountTextbox
    );

    const downloadConfigButton = new DialogElementButton('Download Config File', () => this.getConfigFile());
    downloadConfigButton.enabledCallback = () => this._configSaved;

    dialog.rows[2].elements.push(
      downloadConfigButton
    );

    dialog.rows[3].elements.push(
      new DialogElementButton('Save', () => { }, true),
      new DialogElementButton('Close', () => { }, true)
    );

    this._dialogService.showDialog(dialog);
  }

  public selectAddEffect(effect: LedEffectKind) {
    this.selectedAddEffect = effect;
  }

  public getConfigFile() {
    this._ledService.getConfigFile('57e00b61-2a0d-46ec-90df-2ddce407664e').subscribe(config => {
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
