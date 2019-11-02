import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service';
import { Observable } from 'rxjs';
import { LedConfigurationDto } from 'src/app/models/application-facade';
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

  public getConfigs(): Observable<Array<LedConfig>> {
    return this._apiService.get<Array<LedConfigurationDto>>('led/configs')
      .pipe(
        map(
          dtos => dtos.map(
            dto => new LedConfig(dto)
          )
        )
      );
  }

  public updateConfig(newConfig: LedConfigurationDto): Observable<void> {
    return this._apiService.post<void>('led/config', newConfig);
  }
}
