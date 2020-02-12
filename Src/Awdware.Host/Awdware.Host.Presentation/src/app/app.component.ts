import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import '@angular/compiler';
import { environment } from '../environments/environment';
import { FacadeService } from 'awdware-core-shared';
import { AppService } from './services/app.service';

@Component({
  selector: 'awd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _appService: AppService;
  private _facadeService: FacadeService;

  constructor(
    appService: AppService,
    facadeService: FacadeService,
    viewContainerRef: ViewContainerRef,
  ) {
    this._appService = appService;
    this._facadeService = facadeService;
    this._appService.rootViewContainerRef = viewContainerRef;
  }

  ngOnInit(): void {
    this._facadeService.updated.subscribe(x => {
      console.log(x);
    });



  }
}
