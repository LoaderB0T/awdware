import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit } from '@angular/core';

import { TranslationService } from './shared/services/translation.service';
import { ThemeService } from './shared/services/theme.service';
import { DialogService } from './shared/services/dialog.service';

@Component({
  selector: 'awd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private previousScroll: number;
  public hideMenu: boolean = false;

  @ViewChild('mainContent', { static: true }) private _mainContent: ElementRef<HTMLDivElement>;

  constructor(
    private translationService: TranslationService,
    private themeService: ThemeService,
    private dialogService: DialogService,
    viewContainerRef: ViewContainerRef
  ) {
    this.translationService.init();
    this.themeService.changeTheme(themeService.darkTheme);
    dialogService.setRootViewContainerRef(viewContainerRef);
  }

  ngOnInit(): void {
    this.previousScroll = this._mainContent.nativeElement.scrollTop;
  }

  public get dialogVisible() {
    return this.dialogService.dialogVisible;
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
