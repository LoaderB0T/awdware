import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';
import { InvalidOperationError } from '../models/invalid-operation-error';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _globalStyleSheet?: CSSStyleSheet;

  private readonly themes: Theme[] = [this.darkTheme, this.lightTheme];
  public selectedTheme: Theme = this.themes[0];

  constructor() {}

  public init() {
    if (this._globalStyleSheet) {
      return;
    }
    const styleSheet = document.createElement('style');
    styleSheet.id = 'global-stylesheet';
    document.head.appendChild(styleSheet);
    this._globalStyleSheet = styleSheet.sheet as CSSStyleSheet;

    const savedThemeName = localStorage.getItem('theme');
    if (savedThemeName) {
      const savedTheme = this.themes.find(x => x.name === savedThemeName);
      if (savedTheme) {
        this.setTheme(savedTheme);
        return;
      }
    }
    this.setTheme(this.darkTheme);
  }

  public changeTheme(themeName: 'dark' | 'light') {
    const theme = this.themes.find(x => x.name === themeName);
    if (theme) {
      this.setTheme(theme);
    }
  }

  private setTheme(theme: Theme) {
    if (!this._globalStyleSheet) {
      throw new InvalidOperationError("Theme service has not been initialized. Call 'init' method before setting the theme");
    }

    if (this._globalStyleSheet.rules.length > 0) {
      this._globalStyleSheet.removeRule(0);
    }
    this._globalStyleSheet.addRule(':root', theme.toRules(), 0);
    this.selectedTheme = theme;
    localStorage.setItem('theme', theme.name);
  }

  public getColor(key: string): string {
    return this.selectedTheme.props.find(x => x.name === key)?.value ?? 'rgb(0,0,0)';
  }

  private get darkTheme(): Theme {
    const theme = new Theme('dark');
    theme.props = [
      { name: 'colorBgPrimary', value: 'rgb(18, 18, 18)' },
      { name: 'colorBgSecondary', value: 'rgba(25, 25, 25, 1)' },
      { name: 'colorBgTertiary', value: 'rgba(35, 35, 35, 1)' },
      { name: 'colorMainContent', value: 'rgb(242, 239, 234)' },
      { name: 'colorPassiveContent', value: 'rgb(140, 138, 133)' },
      { name: 'colorHighlightContent04', value: 'rgba(0, 0, 0, 0.35)' },
      { name: 'colorHighlightContent10', value: 'rgba(0, 0, 0, 0.75)' },
      { name: 'colorHighlightContent', value: 'rgba(0, 15, 20, 1)' },
      { name: 'colorHighlightColor1', value: 'rgb(255, 0, 82)' },
      { name: 'colorHighlightColor2', value: 'rgb(255, 167, 0)' },
      { name: 'colorError', value: 'rgb(238, 31, 16)' }
    ];
    return theme;
  }

  private get lightTheme(): Theme {
    const theme = new Theme('light');
    theme.props = [
      { name: 'colorBgPrimary', value: 'rgb(240, 240, 240)' },
      { name: 'colorBgSecondary', value: 'rgba(225, 225, 230, 1)' },
      { name: 'colorBgTertiary', value: 'rgba(180, 180, 185, 1)' },
      { name: 'colorMainContent', value: 'rgb(10, 10, 15)' },
      { name: 'colorPassiveContent', value: 'rgb(50, 50, 60)' },
      { name: 'colorHighlightContent04', value: 'rgba(255, 255, 255, 0.6)' },
      { name: 'colorHighlightContent10', value: 'rgba(255, 255, 255, 0.9)' },
      { name: 'colorHighlightContent', value: 'rgba(0, 15, 20, 1)' },
      { name: 'colorHighlightColor1', value: 'rgb(255 0 82)' },
      { name: 'colorHighlightColor2', value: 'rgb(255 167 0)' },
      { name: 'colorError', value: 'rgb(238, 31, 16)' }
    ];
    return theme;
  }
}
