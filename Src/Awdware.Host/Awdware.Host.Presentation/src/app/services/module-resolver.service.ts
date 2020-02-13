import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { Resolve, Router, ActivatedRoute, Routes } from '@angular/router';
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
  private services = new Array<{ name: string, instance: any }>();
  private facadeRoutes: Routes = [];
  private routes: Routes = [];

  private pkgCount = 2;

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    factoryResolver: ComponentFactoryResolver,
    appService: AppService,
    injector: Injector,
    private routingService: RoutingService, private facadeService: FacadeService, private sessionStoreService: SessionStoreService
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
          // facade.services?.export?.forEach(s => {
          //   const service = this._injector.get(m[s]);
          //   this.services.push({ name: s, instance: service });
          // });
          facade.apiUrl = environment.apiUrl;
          if (facade.entryComponentName) {
            const componentType = m[facade.entryComponentName];
            const factory = this._factoryResolver.resolveComponentFactory(componentType);
            const component = factory.create(this._appService.rootViewContainerRef.parentInjector);
            this._appService.rootViewContainerRef.insert(component.hostView);
          }
          if (m.routes as any[]) {
            const routes = m.routes as any[];
            if (facade.entryComponentName) {
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
        // console.warn(lazyModule[lazyModule.facade.mainModuleName]);
        const i = this._injector.get(lazyModule[lazyModule.facade.initServiceName]);
        // const tmp = new lazyModule[lazyModule.facade.mainModuleName](this.routingService, this.facadeService, this.sessionStoreService);
        this.modules.push(lazyModule);
        if (this.modules.length === this.pkgCount) {
          obs.next(null);
        }
      });
      import('awdware-games').then(lazyModule => {
        const i = this._injector.get(lazyModule[lazyModule.facade.initServiceName]);
        // const tmp = new lazyModule[lazyModule.facade.mainModuleName](this.routingService, this.facadeService);
        this.modules.push(lazyModule);
        if (this.modules.length === this.pkgCount) {
          obs.next(null);
        }
      });
    });
  }

}
