import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SubscriptionManager } from '../models/subscription-manager';
import { BaseDialog } from '../models/base-dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _factoryResolver: ComponentFactoryResolver;
  private _rootViewContainer: ViewContainerRef;
  private _subMgrs = new Array<{ id: string; mgr: SubscriptionManager }>();

  public dialogVisible: boolean;

  constructor(factoryResolver: ComponentFactoryResolver) {
    this._factoryResolver = factoryResolver;
  }

  public hideAllDialogs() {
    this._rootViewContainer.clear();
    this._subMgrs.forEach(subMgr => {
      subMgr.mgr.unsubscribeAll();
    });
    this._subMgrs.length = 0;
    this.dialogVisible = false;
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this._rootViewContainer = viewContainerRef;
  }

  public showComponentDialog<T extends BaseDialog>(componentType: new (...args) => T): T {
    const newId = this.getRandomId();

    this._subMgrs.push({ id: newId, mgr: new SubscriptionManager() });
    const factory = this._factoryResolver.resolveComponentFactory<T>(componentType);
    const component = factory.create(this._rootViewContainer.parentInjector);

    if (component.instance.closeDialog) {
      const hideSub = component.instance.closeDialog.subscribe((id: string) => {
        const indexToRemove = this._rootViewContainer.indexOf(component.hostView);

        this._rootViewContainer.remove(indexToRemove);
        this._subMgrs.find(subMgr => subMgr.id === id)?.mgr?.unsubscribeAll();
        if (this._rootViewContainer.length === 0) {
          this.dialogVisible = false;
        }
      });
      this._subMgrs.find(subMgr => subMgr.id === newId)?.mgr?.add(hideSub);
    } else {
      // should rather not happen I hope
      console.warn('This Component does not implement the BaseDialog Class:');
      console.warn(component.instance);
    }

    this._rootViewContainer.insert(component.hostView);
    this.dialogVisible = true;
    return component.instance;
  }

  private getRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
