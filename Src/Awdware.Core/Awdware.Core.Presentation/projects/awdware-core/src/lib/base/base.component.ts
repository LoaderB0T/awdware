import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { ThemeService, TranslationService, DialogService } from 'awdware-shared';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  private _themeService: ThemeService;
  private _translationService: TranslationService;
  private _dialogService: DialogService;
  private previousScroll: number;
  public hideMenu: boolean = false;

  @ViewChild('mainContent', { static: true }) private _mainContent: ElementRef<HTMLDivElement>;


  constructor(
    viewContainerRef: ViewContainerRef,
    router: Router,
    themeService: ThemeService,
    translationService: TranslationService,
    dialogService: DialogService
  ) {
    this._themeService = themeService;
    this._translationService = translationService;
    this._dialogService = dialogService;

    this._translationService.init();
    this._themeService.init();
    this._dialogService.setRootViewContainerRef(viewContainerRef);
    router.events
      .pipe(
        filter(
          (event: NavigationStart) => {
            return (event instanceof NavigationStart);
          }
        )
      )
      .subscribe(
        () => {
          this._dialogService.hideAllDialogs();
        }
      );
  }

  ngOnInit(): void {
    this.previousScroll = this._mainContent.nativeElement.scrollTop;
  }



  public get dialogVisible() {
    return this._dialogService.dialogVisible;
  }

  public handleScroll() {
    const newScrollTop = this._mainContent.nativeElement.scrollTop;
    if (newScrollTop === 0) {
      this.hideMenu = false;
    } else if (this.previousScroll < newScrollTop) {
      this.hideMenu = true;
    } else {
      this.hideMenu = false;
    }
    this.previousScroll = newScrollTop;
  }

}
