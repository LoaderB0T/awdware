import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService, TranslationService } from '@awdware/shared';

@Component({
  selector: 'awd-home',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private readonly _themeService: ThemeService;
  private readonly _translationService: TranslationService;

  constructor(translateService: TranslationService, themeService: ThemeService) {
    this._translationService = translateService;
    this._themeService = themeService;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  public darkTheme() {
    this._themeService.changeTheme('dark');
  }
  public lightTheme() {
    this._themeService.changeTheme('light');
  }
  public german() {
    this._translationService.setLanguage('de_DE');
  }
  public english() {
    this._translationService.setLanguage('en_US');
  }
}
