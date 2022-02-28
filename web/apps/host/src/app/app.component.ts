import { Component } from '@angular/core';
import { ThemeService } from '@awdware/shared';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host';

  constructor(themeService: ThemeService) {
    themeService.init();
    themeService.changeTheme('dark');
  }
}
