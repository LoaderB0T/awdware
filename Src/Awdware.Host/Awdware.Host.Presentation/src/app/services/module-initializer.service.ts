import { Injectable, Injector, Compiler, Provider } from '@angular/core';
import { Resolve, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { modulePackages } from '../.gah-generated/gah-modules';


@Injectable({ providedIn: 'root' })
export class ModuleInitializerService implements Resolve<null> {
  private _router: Router;
  // private _injector: Injector;
  private _modules = new Array<any>();
  private _facadeRoutes: Routes = [];
  private _routes: Routes = [];

  constructor(
    router: Router,
    // injector: Injector
  ) {
    this._router = router;
    // this._injector = injector;
  }

  private setEnvironmentValues(env: any) {
    if (env) {
      Object.keys(env).forEach(k => {
        if (environment[k] === undefined) {
          console.error('Missing value in host environment: ' + k);
        }
        env[k] = environment[k];
      });
    }
  }

  resolve(): Observable<null> {
    return new Observable<null>(obs => {
      this.loadModules().subscribe(() => {
        this._modules.forEach(m => {
          const mod = m.module;
          const isEntry = m.isEntry;

          this.setEnvironmentValues(mod.environment);
          this.readModuleRoutes(mod, isEntry);
        });

        this._facadeRoutes[0].children.push(...this._routes);

        this._router.resetConfig(this._facadeRoutes);

        const urlParams = new URLSearchParams(window.location.search);
        const params = {};
        urlParams.forEach((v, k) => {
          params[k] = v;
        });
        this._router.navigate(window.location.pathname.split('/'), { queryParams: params });

        obs.next(null);
      });
    });
  }

  private readModuleRoutes(mod: any, isEntry: boolean) {
    if (mod.routes) {
      const routes = mod.routes;
      if (isEntry) {
        this._facadeRoutes = routes;
      } else {
        this._routes.push(...routes);
      }
    }
  }

  private loadModules() {
    return new Observable<void>(obs => {
      modulePackages.forEach((moduleImport) => {
        this._modules.push(moduleImport);
        if (this._modules.length === modulePackages.length) {
          obs.next(null);
        }
      });
    });
  }
}
