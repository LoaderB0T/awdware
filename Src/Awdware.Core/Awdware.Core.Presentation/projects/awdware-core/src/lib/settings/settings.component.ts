import { Component, OnInit } from '@angular/core';
import { FacadeService, ThemeService, TranslationService } from '@awdware/shared';

@Component({
  selector: 'awd-home',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private readonly _themeService: ThemeService;
  private readonly _translationService: TranslationService;
  private readonly _facadeService: FacadeService;

  constructor(translateService: TranslationService, themeService: ThemeService, facadeService: FacadeService) {
    this._translationService = translateService;
    this._themeService = themeService;
    this._facadeService = facadeService;
  }

  ngOnInit() {
    this._facadeService.setActiveMenuItem('settings');
  }

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
