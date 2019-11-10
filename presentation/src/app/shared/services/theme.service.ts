import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() { }

  public selectedTheme: Theme;

  public changeTheme(theme: Theme) {
    theme.props.forEach(prop => {
      document.documentElement.style.setProperty('--' + prop.name, prop.value);
    });
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
      { name: 'colorPassiveContent', value: 'rgb(117, 115, 110)' },
      { name: 'colorHighlightContent', value: 'rgb(50, 49, 48)' },
      { name: 'colorHighlightColor1', value: 'rgb(242, 0, 255)' },
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
      { name: 'colorHighlightContent', value: 'rgb(182, 183, 196)' },
      { name: 'colorHighlightColor1', value: 'rgb(242, 0, 255)' },
      { name: 'colorHighlightColor2', value: 'rgb(38, 131, 224)' },
      { name: 'colorError', value: 'rgb(238, 31, 16)' },
    ];
    return theme;
  }
}
