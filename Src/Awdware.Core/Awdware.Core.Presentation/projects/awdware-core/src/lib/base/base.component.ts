import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { DialogService } from '@gah/Awdware.Shared.Presentation';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'awd-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  private _dialogService: DialogService;
  private previousScroll: number;
  public hideMenu: boolean = false;

  @ViewChild('mainContent', { static: true }) private _mainContent: ElementRef<HTMLDivElement>;


  constructor(
    viewContainerRef: ViewContainerRef,
    router: Router,
    dialogService: DialogService,
    title: Title
  ) {
    this._dialogService = dialogService;
    title.setTitle('awdware ■▀■');
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

    this.addScript('./assets/Awdware.Core.Presentation/js/fontawesome.all.min.js', { defer: true });
    this.addLink('https://fonts.googleapis.com/css?family=Montserrat:400,700', { rel: 'stylesheet' });
    this.addLink('https://fonts.googleapis.com/css?family=Aleo:700', { rel: 'stylesheet' });

    if ((window.document as any).documentMode) {
      // Do IE stuff
      document.body.innerHTML = 'THIS WEBSITE IS NOT SUPPORTED IN INTERNET EXPLORER'
    }
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

  private addScript(src: string, extraProperties: { [key: string]: any }) {
    const script = document.createElement('script');
    Object.keys(extraProperties).forEach(key => {
      script[key] = extraProperties[key];
    });
    script.src = src;
    document.head.appendChild(script);
  }

  private addLink(rhef: string, extraProperties: { [key: string]: any }) {
    const link = document.createElement('link');
    Object.keys(extraProperties).forEach(key => {
      link[key] = extraProperties[key];
    });
    link.href = rhef;
    document.head.appendChild(link);
  }

}
