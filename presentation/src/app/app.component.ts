import { Component, ViewContainerRef } from '@angular/core';

import { TranslationService } from './shared/services/translation.service';
import { ThemeService } from './shared/services/theme.service';
import { DialogService } from './shared/services/dialog.service';

@Component({
  selector: 'awd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'presentation';

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

  public get dialogVisible() {
    return this.dialogService.dialogVisible;
  }
}
