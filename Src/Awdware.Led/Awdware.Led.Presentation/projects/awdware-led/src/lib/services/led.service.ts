import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WebApiService } from '@awdware/shared';

import { LedEffect } from '../models/led-config.model';
import { LedConfigurationDto, LedEffectKind, LedSettingsDto } from '../models/application-facade';

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private readonly _apiService: WebApiService;
  public ledEffects: LedEffect[] = new Array<LedEffect>();

  constructor(apiService: WebApiService) {
    this._apiService = apiService;
  }

  public getEffetcs(): Observable<void> {
    return this._apiService.get<Array<LedConfigurationDto>>('led/effects').pipe(
      tap(dtos => {
        dtos.sort((a, b) => a.ordinal - b.ordinal);
        const models = dtos.map(dto => LedEffect.fromDto(dto));
        this.ledEffects = models;
      }),
      map(() => null)
    );
  }

  public deleteEffect(id: string) {
    const deleteIndex = this.ledEffects.findIndex(x => x.id === id);
    this.ledEffects.splice(deleteIndex, 1);
    return this._apiService.delete<boolean>(`led/effect/${id}`);
  }

  public updateEffect(newConfig: LedEffect): Observable<void> {
    return this._apiService.put<void>('led/effect', newConfig.toDto());
  }

  public addEffect(newConfig: LedEffect): Observable<string> {
    return this._apiService.post<string>('led/effect', newConfig.toDto(), false);
  }

  public getNewEffect(kind: LedEffectKind, name: string) {
    const newEffect = new LedEffect(name, kind);
    return newEffect;
  }

  public selectEffect(id: string) {
    return this._apiService.get<void>(`led/selecteffect/${id}`);
  }

  public getConfigFile(id: string) {
    return this._apiService.get<string>(`led/configfile/${id}`, false);
  }

  public getAllSettings() {
    return this._apiService.get<LedSettingsDto[]>('led/settings');
  }

  public updateSetting(ledSetting: LedSettingsDto) {
    return this._apiService.post<boolean>('led/setting', ledSetting);
  }

  public addSettings() {
    return this._apiService.get<LedSettingsDto>('led/setting');
  }

  public deleteSetting(id: string) {
    return this._apiService.delete<boolean>(`led/setting/${id}`);
  }
}
