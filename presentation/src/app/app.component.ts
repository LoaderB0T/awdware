import { Component } from '@angular/core';

import { TranslationService } from './shared/services/translation.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'awd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'presentation';

  constructor(private translationService: TranslationService, private themeService: ThemeService) {
    this.translationService.init();
    this.themeService.changeTheme(themeService.darkTheme);
  }
}
