import { Component } from '@angular/core';

import { TranslationService } from './services/translation.service';

@Component({
  selector: 'awd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'presentation';

  constructor(private translationService: TranslationService) {
    this.translationService.init();
  }
}
