import { Component, Input, Output, EventEmitter } from '@angular/core';

import { InputType, DownloadService } from '@awdware/shared';

import { LedService } from '../../services/led.service';
import { LedSettingsDto } from '../../models/application-facade';

@Component({
  selector: 'awd-led-setting',
  templateUrl: './led-setting.component.html',
  styleUrls: ['./led-setting.component.scss']
})
export class LedSettingComponent {
  @Input() settings!: LedSettingsDto;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() deleteSetting = new EventEmitter<string>();

  InputType: typeof InputType = InputType;
  private readonly _ledService: LedService;
  public configSaved: boolean = true;
  public _downloadService: DownloadService;

  constructor(ledService: LedService, downloadService: DownloadService) {
    this._ledService = ledService;
    this._downloadService = downloadService;
  }

  public saveCurrentSettings() {
    this._ledService.updateSetting(this.settings).then(() => {
      this.configSaved = true;
    });
  }

  public getConfigFile() {
    this._ledService.getConfigFile(this.settings.id).then(config => {
      this._downloadService.downloadStringAsFile('config.led', config);
    });
  }

  public close() {
    this.closeDialog.next();
  }

  public delete() {
    this.deleteSetting.next(this.settings.id);
  }

  public editedSettings() {
    this.configSaved = false;
    // todo: save this information in a model for each setting (not a dto!)
  }
}
