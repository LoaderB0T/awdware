import { Injectable, ComponentFactoryResolver, Injector, NgModuleFactoryLoader, Compiler, Type } from '@angular/core';
import { Resolve, Router, ActivatedRoute, Routes, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppService } from './app.service';
import { AwdwareFacade, FacadeService } from 'awdware-shared';
import { SessionStoreService, RoutingService } from 'awdware-core';


@Injectable({ providedIn: 'root' })
export class ModuleResoverService implements Resolve<null> {
  private _router: Router;
  private _activatedRoute: ActivatedRoute;
  private _factoryResolver: ComponentFactoryResolver;
  private _appService: AppService;
  private _injector: Injector;
  private modules = new Array<any>();
  private facadeRoutes: Routes = [];
  private routes: Routes = [];

  private pkgCount = 2;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    factoryResolver: ComponentFactoryResolver,
    appService: AppService,
    injector: Injector,
    private compiler: Compiler
  ) {
    this._router = router;
    this._activatedRoute = activatedRoute;
    this._factoryResolver = factoryResolver;
    this._appService = appService;
    this._injector = injector;
  }



  resolve(): Observable<null> {
    return new Observable<null>(obs => {
      this.loadModules().subscribe(() => {
        this.modules.forEach(m => {
          const facade = m.facade as AwdwareFacade;
          facade.apiUrl = environment.apiUrl;
          if (m.routes as any[]) {
            const routes = m.routes as any[];
            if (facade.isEntryComponent) {
              this.facadeRoutes = routes;
            } else {
              this.routes.push(...routes);
            }
          }
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

  private loadModules() {
    return new Observable<void>(obs => {
      import('awdware-core').then(lazyModule => {
        const _ = this.compiler.compileModuleSync(lazyModule.CoreModule).create(this._injector);
        this.modules.push(lazyModule);
        if (this.modules.length === this.pkgCount) {
          obs.next(null);
        }
      });
      import('awdware-games').then(lazyModule => {
        const _ = this.compiler.compileModuleSync(lazyModule.GamesModule).create(this._injector);
        this.modules.push(lazyModule);
        if (this.modules.length === this.pkgCount) {
          obs.next(null);
        }
      });
    });
  }
}
