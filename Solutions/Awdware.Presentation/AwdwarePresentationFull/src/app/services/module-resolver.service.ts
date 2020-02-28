import { Injectable, Injector, Compiler, Provider } from '@angular/core';
import { Resolve, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { AwdwareFacade } from 'awdware-shared';
import { facade as core_facade } from '../awdware-core/src/lib/facade';
import { facade as games_facade } from '../awdware-games/src/lib/facade';
import { facade as led_facade } from '../awdware-led/src/lib/facade';

import { routes as core_routes, CoreModule } from '../awdware-core/src/public-api';
import { routes as games_routes, GamesModule } from '../awdware-games/src/public-api';
import { routes as led_routes, LedModule } from '../awdware-led/src/public-api';




@Injectable({ providedIn: 'root' })
export class ModuleResoverService implements Resolve<null> {
  private _router: Router;
  private _injector: Injector;
  private modules = new Array<any>();
  private facadeRoutes: Routes = [];
  private routes: Routes = [];

  constructor(
    router: Router,
    injector: Injector,
    private compiler: Compiler
  ) {
    this._router = router;
    this._injector = injector;

    this.modules.push(
      { facade: core_facade, routes: core_routes, type: CoreModule },
      { facade: games_facade, routes: games_routes, type: GamesModule },
      { facade: led_facade, routes: led_routes, type: LedModule }
    );
  }

  private setFacadeValues(facade: AwdwareFacade) {
    facade.apiUrl = environment.apiUrl;
  }

  resolve(): Observable<null> {
    return new Observable<null>(obs => {
      this.modules.forEach(m => {
        const facade = m.facade as AwdwareFacade;

        this.setFacadeValues(facade);

        // This creates an instance of the module, needed to have its constructor called with correct dependency injection
        const _ = this.compiler.compileModuleSync(m.type).create(this._injector);

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
}
