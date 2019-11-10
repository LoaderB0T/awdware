import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WebApiService } from 'src/app/services/web-api.service';
import { LedConfigurationDto, LedEffectKind, LedSettingsDto } from 'src/app/models/application-facade';
import { LedEffect } from '../models/led-config.model';

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private _apiService: WebApiService;
  public ledEffects: LedEffect[] = new Array<LedEffect>();

  constructor(apiService: WebApiService) {
    this._apiService = apiService;
  }

  public getEffetcs(): Observable<void> {
    return this._apiService.get<Array<LedConfigurationDto>>('led/effects')
      .pipe(
        tap(dtos => {
          dtos.sort((a, b) => a.ordinal - b.ordinal);
          const models = dtos.map(
            dto => LedEffect.fromDto(dto)
          );
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
    return this._apiService.post<void>('led/updateeffect', newConfig.toDto());
  }

  public addEffect(newConfig: LedEffect): Observable<string> {
    return this._apiService.post<string>('led/addeffect', newConfig.toDto(), false);
  }

  public getNewEffect(kind: LedEffectKind, name: string) {
    const newEffect = new LedEffect(name, kind);
    return newEffect;
  }

  public selectEffect(id: string) {
    return this._apiService.get<void>(`led/selecteffect/${id}`);
  }

  public getConfigFile(id: string) {
    return this._apiService.get<string>(`led/ledConfigFile/${id}`, false);
  }

  public getAllSettings() {
    return this._apiService.get<LedSettingsDto[]>(`led/ledSettings`);
  }

  public updateSetting(ledSetting: LedSettingsDto) {
    return this._apiService.post<void>('led/updateLedSettings', ledSetting);
  }
}
