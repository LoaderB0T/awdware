import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SubscriptionManager } from '../models/subscription-manager';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _factoryResolver: ComponentFactoryResolver;
  private _rootViewContainer: ViewContainerRef;
  private _subMgrs = new Array<SubscriptionManager>();

  public dialogVisible: boolean;

  private _dialogIndex: number = 0;

  constructor(factoryResolver: ComponentFactoryResolver) {
    this._factoryResolver = factoryResolver;
  }

  public hideAllDialogs() {
    this._rootViewContainer.clear();
    this._subMgrs.forEach(_subMgr => {
      _subMgr.unsubscribeAll();
    });
    this.dialogVisible = false;
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this._rootViewContainer = viewContainerRef;
  }

  public showComponentDialog<T>(componentType: new (args) => T): T {
    this._subMgrs.push(new SubscriptionManager());
    const factory = this._factoryResolver
      .resolveComponentFactory<T>(componentType);
    const component = factory
      .create(this._rootViewContainer.parentInjector);
    // tslint:disable-next-line:no-string-literal
    if (component.instance['closeDialog']) {
      // tslint:disable-next-line:no-string-literal
      const hideSub = component.instance['closeDialog'].subscribe(() => {
        this._rootViewContainer.remove(this._dialogIndex--);
        this._subMgrs[this._dialogIndex].unsubscribeAll();
        if (this._dialogIndex === 0) {
          this.dialogVisible = false;
        }
      });
      this._subMgrs[this._dialogIndex].add(hideSub);
    }
    this._rootViewContainer.insert(component.hostView);
    this.dialogVisible = true;
    this._dialogIndex++;
    return component.instance;
  }
}
