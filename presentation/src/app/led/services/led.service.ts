import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service';
import { Observable } from 'rxjs';
import { LedConfigurationDto, LedEffectKind } from 'src/app/models/application-facade';
import { LedEffect } from '../models/led-config.model';
import { map, tap } from 'rxjs/operators';

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
}
