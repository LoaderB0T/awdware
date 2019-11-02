import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/web-api.service';
import { Observable } from 'rxjs';
import { LedConfigurationDto } from 'src/app/models/application-facade';

@Injectable({
  providedIn: 'root'
})
export class LedService {
  private _apiService: WebApiService;

  constructor(apiService: WebApiService) {
    this._apiService = apiService;
  }

  public getConfigs(): Observable<Array<LedConfigurationDto>> {
    return this._apiService.get<Array<LedConfigurationDto>>('led/configurations');
  }
}
