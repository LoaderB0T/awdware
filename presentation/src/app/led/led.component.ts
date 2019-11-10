import { Component, OnInit } from '@angular/core';
import { LedService } from './services/led.service';
import { LedSettingsDto } from '../models/application-facade';
import { DialogService } from '../shared/services/dialog.service';
import { LedSettingsComponent } from './led-settings/led-settings.component';
import { AddEffectComponent } from './add-effect/add-effect.component';
import { LedEffect } from './models/led-config.model';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit {
  private _ledService: LedService;
  public ledSettings: LedSettingsDto[];
  _dialogService: DialogService;

  constructor(
    ledService: LedService,
    dialogService: DialogService
  ) {
    this._ledService = ledService;
    this._dialogService = dialogService;
  }

  ngOnInit() {
    this._ledService.getEffetcs().subscribe();
    this._ledService.getAllSettings().subscribe(allSettings => {
      this.ledSettings = allSettings;
    });
  }

  public get ledConfigs() {
    return this._ledService.ledEffects;
  }

  public showAddDialog() {
    this._dialogService.showComponentDialog<AddEffectComponent>(AddEffectComponent, null, [{ key: 'effectAdded', callback: (e) => this.effectAdded(e) }]);
  }

  effectAdded(e: LedEffect): void {
    this.ledConfigs.push(e);
  }

  public showSettingsDialog() {
    this._dialogService.showComponentDialog<LedSettingsComponent>(LedSettingsComponent, [{ key: 'settingsList', value: this.ledSettings }]);
  }

  public deleteEffect(id: string) {
    this._ledService.deleteEffect(id).subscribe();
    const index = this.ledConfigs.findIndex(x => x.id === id);
    this.ledConfigs.splice(index, 1);
  }


}
