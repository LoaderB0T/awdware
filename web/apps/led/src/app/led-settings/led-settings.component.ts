import { Component, OnInit, Input } from '@angular/core';

import { BaseDialog, SelectOption } from '@awdware/shared';

import { LedService } from '../services/led.service';
import { LedSettingsDto } from '../models/application-facade';

@Component({
  selector: 'awd-led-settings',
  templateUrl: './led-settings.component.html',
  styleUrls: ['./led-settings.component.scss']
})
export class LedSettingsComponent extends BaseDialog implements OnInit {
  @Input() public settingsList!: LedSettingsDto[];

  public selectedOptionName?: string;
  private readonly _ledService: LedService;

  constructor(ledService: LedService) {
    super();
    this._ledService = ledService;
  }

  ngOnInit() {
    if (this.settingsList && this.settingsList.length > 0) {
      this.selectedOptionName = this.settingsList[0].id;
    }
  }

  public get selectOptions(): SelectOption[] {
    return this.settingsList.map(x => {
      const newOption = {} as SelectOption;
      newOption.key = x.id;
      newOption.text = x.settingName;
      return newOption;
    });
  }

  public get currentSettings(): LedSettingsDto | undefined {
    if (this.selectedOptionName) {
      return this.settingsList.find(x => x.id === this.selectedOptionName);
    } else {
      return undefined;
    }
  }

  public deleteSetting(id: string) {
    this._ledService.deleteSetting(id).then();
    const deleteIndex = this.settingsList.findIndex(x => x.id === id);
    this.settingsList.splice(deleteIndex, 1);
    if (this.settingsList.length > 0) {
      this.selectedOptionName = this.settingsList[0].id;
    } else {
      this.selectedOptionName = '';
    }
  }

  public newSetting() {
    this._ledService.addSettings().then(x => {
      if (!this.settingsList) {
        this.settingsList = new Array<LedSettingsDto>();
      }
      this.settingsList.push(x);
      this.selectedOptionName = x.id;
    });
  }

  public close() {
    this.$closeDialog.next();
  }
}
