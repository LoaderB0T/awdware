import { Component, OnInit } from '@angular/core';
import { LedService } from './services/led.service';
import { LedEffectKind, LedSettingsDto } from '../models/application-facade';
import { DownloadService } from '../shared/services/download.service';
import { DialogService } from '../shared/services/dialog.service';
import { Dialog, DialogRow, DialogElementTextBox, DialogElementText, DialogElementButton, DialogElementSelect } from '../shared/models/dialog.model';
import { InputType } from '../shared/models/input-type';
import { SelectOption } from '../shared/models/select-option.model';

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
  private _currentLedSetting: LedSettingsDto;
  private _ledSettings: LedSettingsDto[];
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
    this._currentLedSetting = new LedSettingsDto();
    this._currentLedSetting.ledCount = 20;
    this._currentLedSetting.comPortName = 'COM1';
  }

  ngOnInit() {
    this._ledService.getEffetcs().subscribe();
    this._ledService.getAllSettings().subscribe(allSettings => {
      this._ledSettings = allSettings;
      this._currentLedSetting = this._ledSettings[0];
    });
  }

  public get ledConfigs() {
    return this._ledService.ledEffects;
  }

  public showAddDialog() {
    this.addEffectName = '';
    this.selectedAddEffect = null;
    this.addDialogVisible = true;
  }

  private get ledCountStr(): string {
    return this._currentLedSetting.ledCount.toString();
  }
  private set ledCountStr(value: string) {
    const parsed = Number.parseInt(value, 10);
    if (parsed && parsed >= 5 && parsed <= 600) {
      this._currentLedSetting.ledCount = parsed;
    }
  }

  private get comPortName(): string {
    return this._currentLedSetting.comPortName;
  }
  private set comPortName(value: string) {
    this._currentLedSetting.comPortName = value;
  }


  get selectedConfig(): string {
    return this._currentLedSetting.id;
  }

  set selectedConfig(value: string) {
    const setting = this._ledSettings.find(x => x.id === value);
    if (setting) {
      this._currentLedSetting = setting;
    }
  }

  private get availableSettings(): SelectOption[] {
    return this._ledSettings.map(x => {
      const a = new SelectOption();
      a.key = x.id;
      a.text = x.settingName;
      return a;
    });
  }

  public showSettingsDialog() {
    const dialog = new Dialog();
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());
    dialog.rows.push(new DialogRow());

    dialog.rows[0].elements.push(
      new DialogElementText('This is a description')
    );

    dialog.rows[1].elements.push(
      new DialogElementSelect(
        'label',
        () => this.selectedConfig,
        (val) => this.selectedConfig = val,
        this.availableSettings)
    );

    const ledCountTextbox = new DialogElementTextBox(
      'Led Count',
      () => this.ledCountStr,
      (val) => this.ledCountStr = val
    );
    ledCountTextbox.constraint = InputType.NUMERIC;
    ledCountTextbox.minValue = 5;
    ledCountTextbox.maxValue = 600;
    dialog.rows[2].elements.push(
      ledCountTextbox
    );

    dialog.rows[3].elements.push(
      new DialogElementTextBox(
        'Com Port Name',
        () => this.comPortName,
        (val) => this.comPortName = val
      )
    );

    const downloadConfigButton = new DialogElementButton('Download Config File', () => this.getConfigFile());
    downloadConfigButton.enabledCallback = () => this._configSaved;

    dialog.rows[4].elements.push(
      downloadConfigButton
    );

    dialog.rows[5].elements.push(
      new DialogElementButton('Save', () => this.saveCurrentSettings(), false),
      new DialogElementButton('Close', null, true)
    );

    this._dialogService.showDialog(dialog);
  }

  private saveCurrentSettings() {
    this._ledService.updateSetting(this._currentLedSetting).subscribe(x => {
      this._configSaved = true;
    });
  }

  public selectAddEffect(effect: LedEffectKind) {
    this.selectedAddEffect = effect;
  }

  public getConfigFile() {
    this._ledService.getConfigFile(this._currentLedSetting.id).subscribe(config => {
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
