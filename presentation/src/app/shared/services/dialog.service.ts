import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { SubscriptionManager } from '../models/subscription-manager';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _factoryResolver: ComponentFactoryResolver;
  private _rootViewContainer: ViewContainerRef;
  private _subMgr = new SubscriptionManager();

  public dialogVisible: boolean;

  constructor(factoryResolver: ComponentFactoryResolver) {
    this._factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this._rootViewContainer = viewContainerRef;
  }

  showComponentDialog<T>(componentType: new () => T, inputs: { key: string, value: any }[] = null, outputs: { key: string, callback: (value: any) => void }[] = null) {
    const factory = this._factoryResolver
      .resolveComponentFactory<T>(componentType);
    const component = factory
      .create(this._rootViewContainer.parentInjector);
    if (inputs) {
      inputs.forEach(input => {
        component.instance[input.key] = input.value;
      });
    }

    if (outputs) {
      outputs.forEach(input => {
        const outputSub = component.instance[input.key].subscribe(x => {
          input.callback(x);
        });
        this._subMgr.add(outputSub);
      });
    }
    // tslint:disable-next-line:no-string-literal
    if (component.instance['closeDialog']) {
      // tslint:disable-next-line:no-string-literal
      const hideSub = component.instance['closeDialog'].subscribe(() => {
        this._rootViewContainer.clear();
        this._subMgr.unsubscribeAll();
        this.dialogVisible = false;
      });
      this._subMgr.add(hideSub);
    }
    this._rootViewContainer.insert(component.hostView);
    this.dialogVisible = true;
  }
}
