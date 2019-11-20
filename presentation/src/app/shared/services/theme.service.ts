import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public selectedTheme: Theme;
  private _globalStyleSheet: CSSStyleSheet;

  constructor() { }

  private init() {
    if (this._globalStyleSheet) {
      return;
    }
    const styleSheet = document.createElement('style');
    styleSheet.id = 'global-stylesheet';
    document.head.appendChild(styleSheet);
    this._globalStyleSheet = styleSheet.sheet as CSSStyleSheet;
  }

  public changeTheme(theme: Theme) {
    this.init();
    this._globalStyleSheet.addRule(':root', theme.toRules(), 0);
    this.selectedTheme = theme;
  }

  public getColor(key: string) {
    return this.selectedTheme.props.find(x => x.name === key).value;
  }

  public get darkTheme(): Theme {
    const theme = new Theme('dark');
    theme.props = [
      { name: 'colorMainBg', value: 'rgb(37, 36, 35)' },
      { name: 'colorMainContent', value: 'rgb(242, 239, 234)' },
      { name: 'colorPassiveContent', value: 'rgb(140, 138, 133)' },
      { name: 'colorHighlightContentTransparent', value: 'rgba(50, 49, 48, 0.8)' },
      { name: 'colorHighlightContent', value: 'rgba(50, 49, 48)' },
      { name: 'colorHighlightColor1', value: 'rgb(255, 0, 66)' },
      { name: 'colorHighlightColor2', value: 'rgb(38, 131, 224)' },
      { name: 'colorError', value: 'rgb(238, 31, 16)' },
    ];
    return theme;
  }

  public get lightTheme(): Theme {
    const theme = new Theme('light');
    theme.props = [
      { name: 'colorMainBg', value: 'rgb(249, 251, 252)' },
      { name: 'colorMainContent', value: 'rgba(26, 25, 25, 1)' },
      { name: 'colorPassiveContent', value: 'rgb(92, 94, 96)' },
      { name: 'colorHighlightContentTransparent', value: 'rgba(227, 227, 230, 0.8)' },
      { name: 'colorHighlightContent', value: 'rgb(227, 227, 230)' },
      { name: 'colorHighlightColor1', value: 'rgb(242, 0, 255)' },
      { name: 'colorHighlightColor2', value: 'rgb(38, 131, 224)' },
      { name: 'colorError', value: 'rgb(238, 31, 16)' },
    ];
    return theme;
  }
}
