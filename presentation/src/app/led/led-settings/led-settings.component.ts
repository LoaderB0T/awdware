import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LedSettingsDto } from 'src/app/models/application-facade';
import { SelectOption } from 'src/app/shared/models/select-option.model';

@Component({
  selector: 'awd-led-settings',
  templateUrl: './led-settings.component.html',
  styleUrls: ['./led-settings.component.scss']
})
export class LedSettingsComponent implements OnInit {

  @Input() public settingsList: LedSettingsDto[];
  @Output() public closeDialog = new EventEmitter();


  public selectedOptionName: string;

  constructor() { }

  ngOnInit() {
    if (this.settingsList && this.settingsList.length > 0) {
      this.selectedOptionName = this.settingsList[0].id;
    }
  }

  public get selectOptions(): SelectOption[] {
    return this.settingsList.map(x => {
      const newOption = new SelectOption();
      newOption.key = x.id;
      newOption.text = x.settingName;
      return newOption;
    });
  }

  public get currentSettings(): LedSettingsDto {
    if (this.selectedOptionName) {
      return this.settingsList.find(x => x.id === this.selectedOptionName);
    }
  }

  public close() {
    this.closeDialog.next();
  }
}

