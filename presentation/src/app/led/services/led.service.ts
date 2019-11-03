import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service';
import { Observable } from 'rxjs';
import { LedConfigurationDto, LedEffectKind } from 'src/app/models/application-facade';
import { LedConfig } from '../models/led-config.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private _apiService: WebApiService;

  constructor(apiService: WebApiService) {
    this._apiService = apiService;
  }

  public getEffetcs(): Observable<Array<LedConfig>> {
    return this._apiService.get<Array<LedConfigurationDto>>('led/effects')
      .pipe(
        map(
          dtos => dtos.map(
            dto => LedConfig.fromDto(dto)
          )
        )
      );
  }

  public updateEffect(newConfig: LedConfigurationDto): Observable<void> {
    return this._apiService.post<void>('led/updateeffect', newConfig);
  }

  public addEffect(newConfig: LedConfigurationDto): Observable<string> {
    return this._apiService.post<string>('led/addeffect', newConfig);
  }

  public getNewEffect(kind: LedEffectKind, name: string) {
    const newEffect = new LedConfig(name, kind);
    return newEffect;
  }
}
