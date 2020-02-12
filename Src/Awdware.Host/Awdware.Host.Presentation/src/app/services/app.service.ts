import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  public rootViewContainerRef: ViewContainerRef;

  constructor(
  ) {
  }

  public setRootViewRef(v: ViewContainerRef) {
    this.rootViewContainerRef = v;
  }
}
