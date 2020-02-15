import { Injectable, Injector, Compiler, Provider } from '@angular/core';
import { Resolve, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';

import { AwdwareFacade } from 'awdware-shared';

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ModuleResoverService implements Resolve<null> {
  private _router: Router;
  private _injector: Injector;
  private modules = new Array<any>();
  private facadeRoutes: Routes = [];
  private routes: Routes = [];
  private providers = new Array<Provider>();

  constructor(
    router: Router,
    injector: Injector,
    private compiler: Compiler
  ) {
    this._router = router;
    this._injector = injector;
  }

  private setFacadeValues(facade: AwdwareFacade) {
    facade.apiUrl = environment.apiUrl;
  }

  resolve(): Observable<null> {
    return new Observable<null>(obs => {
      this.loadModules().subscribe(() => {
        this.modules.forEach(m => {
          const facade = m.facade as AwdwareFacade;

          this.setFacadeValues(facade);

          // This creates an instance of the module, needed to have its constructor called with correct dependency injection
          const _ = this.compiler.compileModuleSync(m[facade.baseModuleName]).create(this._injector);

          this.readModuleRoutes(m, facade);
        });

        this.facadeRoutes[0].children.push(...this.routes);

        this._router.resetConfig(this.facadeRoutes);

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

  private readModuleRoutes(mod: any, facade: AwdwareFacade) {
    if (mod.routes) {
      const routes = mod.routes;
      if (facade.isEntryComponent) {
        this.facadeRoutes = routes;
      } else {
        this.routes.push(...routes);
      }
    }
  }

  private loadModules() {
    const moduleImports = [import('awdware-games'), import('awdware-core')];


    return new Observable<void>(obs => {
      moduleImports.forEach((moduleImport: any) => {
        moduleImport.then(lazyModule => {
          this.modules.push(lazyModule);
          if (this.modules.length === moduleImports.length) {
            obs.next(null);
          }
        });
      });
    });
  }
}
