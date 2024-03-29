import { Component, OnInit, OnDestroy } from '@angular/core';

import { DialogService, SubscriptionManager, FacadeService } from '@awdware/shared';

import { LedService } from './services/led.service';
import { LedSettingsComponent } from './led-settings/led-settings.component';
import { AddEffectComponent } from './add-effect/add-effect.component';
import { LedEffect } from './models/led-config.model';
import { LedSettingsDto } from './models/application-facade';

@Component({
  selector: 'awd-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss']
})
export class LedComponent implements OnInit, OnDestroy {
  private readonly _ledService: LedService;
  private readonly _dialogService: DialogService;
  private readonly _facadeService: FacadeService;
  private readonly _subMgr = new SubscriptionManager();

  public ledSettings: LedSettingsDto[] = [];

  constructor(ledService: LedService, dialogService: DialogService, facadeService: FacadeService) {
    this._ledService = ledService;
    this._dialogService = dialogService;
    this._facadeService = facadeService;
  }

  ngOnInit() {
    this._ledService.getEffetcs();
    this._ledService.getAllSettings().then(allSettings => {
      this.ledSettings = allSettings;
    });
    this._facadeService.setActiveMenuItem('led');
  }

  ngOnDestroy() {
    this._subMgr.unsubscribeAll();
  }

  public get ledConfigs() {
    return this._ledService.ledEffects;
  }

  public showAddDialog() {
    const addEffectDialog = this._dialogService.showComponentDialog<AddEffectComponent>(AddEffectComponent);
    const sub = addEffectDialog.effectAdded.subscribe((e: LedEffect) => this.effectAdded(e));
    this._subMgr.add(sub);
  }

  public effectAdded(e: LedEffect): void {
    this.ledConfigs.push(e);
  }

  public showSettingsDialog() {
    const ledSettingsDialog = this._dialogService.showComponentDialog<LedSettingsComponent>(LedSettingsComponent);
    ledSettingsDialog.settingsList = this.ledSettings;
  }

  public deleteEffect(id: string) {
    this._ledService.deleteEffect(id);
    const index = this.ledConfigs.findIndex(x => x.id === id);
    this.ledConfigs.splice(index, 1);
  }
}
