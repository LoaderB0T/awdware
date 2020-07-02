import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { DialogService } from '@awdware/awdware-shared';
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

    // Another one of those very useless but stil lvery fun details :)
    const rndmTitleEmojis = ['*^____^*', 'O(∩_∩)O', '(～￣▽￣)～', '（*＾-＾*）', '(*^_^*)', '(❁´◡`❁)', '(´▽`ʃ♡ƪ)', '♪(^∇^*)', '(oﾟvﾟ)ノ', '(☆▽☆)', '(o゜▽゜)o', '☆ヾ(•ω•`)o', '\\(￣︶￣*\\)', ')(￣o￣) . z Z', '\\(@^0^@)/', 'ヾ(^▽^*)))', '✪ ω ✪', '♪(´▽｀)', 'ヽ(✿ﾟ▽ﾟ)ノ', '（。＾▽＾）', '(☞ﾟヮﾟ)☞', '☜(ﾟヮﾟ☜)', '(⌐■_■)', '(•_•)', '¯\\_(ツ)_/¯', '( ͡• ͜ʖ ͡• )'];
    title.setTitle('awdware   ' + rndmTitleEmojis[Math.random() * (rndmTitleEmojis.length) | 0]); // bitwise operator floors a (very tiny) bit faster
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
