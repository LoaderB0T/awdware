import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
  private readonly _dialogService: DialogService;

  constructor(
    viewContainerRef: ViewContainerRef,
    router: Router,
    dialogService: DialogService,
    title: Title
  ) {
    this._dialogService = dialogService;

    // Another one of those very useless but stil lvery fun details :)
    const rndmTitleEmojis = [
      '*^____^*', 'O(∩_∩)O', '(～￣▽￣)～', '（*＾-＾*）', '(*^_^*)', '(❁´◡`❁)', '(´▽`ʃ♡ƪ)', '♪(^∇^*)', '(oﾟvﾟ)ノ', '(☆▽☆)', '(o゜▽゜)o',
      '☆ヾ(•ω•`)o', '\\(￣︶￣*\\)', ')(￣o￣) . z Z', '\\(@^0^@)/', 'ヾ(^▽^*)))', '✪ ω ✪', '♪(´▽｀)', 'ヽ(✿ﾟ▽ﾟ)ノ', '（。＾▽＾）', '(☞ﾟヮﾟ)☞',
      '☜(ﾟヮﾟ☜)', '(⌐■_■)', '(•_•)', '¯\\_(ツ)_/¯', '( ͡• ͜ʖ ͡• )'
    ];
    // bitwise operator floors a (very tiny) bit faster, very unnecessary 
    // eslint-disable-next-line no-irregular-whitespace
    title.setTitle(`awdware   ${rndmTitleEmojis[Math.random() * (rndmTitleEmojis.length) | 0]}`);
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
    if ((window.document as any).documentMode) {
      // Do IE stuff
      document.body.innerHTML = 'THIS WEBSITE IS NOT SUPPORTED IN INTERNET EXPLORER';
    }
  }

  public get dialogVisible() {
    return this._dialogService.dialogVisible;
  }
}
