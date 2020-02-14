import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AwdwareConfig } from '../models/awdware-config';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FacadeService {
  private $updated = new Subject<AwdwareConfig[]>();
  public configurations: { key: string, config: AwdwareConfig }[];
  public updated = this.$updated.asObservable();

  public intercept: (req: HttpRequest<any>, next: HttpHandler) => Observable<HttpEvent<any>>;

  public addOrUpdateConfiguration(name: string, config: AwdwareConfig) {
    if (!this.configurations) {
      this.configurations = new Array<{ key: string, config: AwdwareConfig }>();
    }
    const cfgIndex = this.configurations.findIndex(x => x.key === name);
    if (cfgIndex > -1) {
      this.configurations.splice(cfgIndex, 1);
    }
    this.configurations.push({ key: name, config });
    this.$updated.next(this.getAllConfigs());
  }

  public getAllConfigs(): AwdwareConfig[] {
    return this.configurations?.map(x => x.config);
  }
}
