import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Resolve, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppService } from './app.service';

@Injectable({ providedIn: 'root' })
export class ModuleResoverService implements Resolve<null> {
  private _router: Router;
  private _activatedRoute: ActivatedRoute;
  private _factoryResolver: ComponentFactoryResolver;
  private _appService: AppService;
  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    factoryResolver: ComponentFactoryResolver,
    appService: AppService
  ) {
    this._router = router;
    this._activatedRoute = activatedRoute;
    this._factoryResolver = factoryResolver;
    this._appService = appService;
  }

  resolve(): Observable<null> {
    return new Observable<null>(obs => {

      import('awdware-core').then(lazyModule => {
        // console.log(shared);
        lazyModule.facade.apiUrl = environment.apiUrl;


        if (lazyModule.facade.entryComponentName) {
          const componentType = lazyModule[lazyModule.facade.entryComponentName];
          const factory = this._factoryResolver
            .resolveComponentFactory(componentType);

          const component = factory
            .create(this._appService.rootViewContainerRef.parentInjector);

          this._appService.rootViewContainerRef.insert(component.hostView);

        }
        this._router.resetConfig(lazyModule.routes);

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

}
