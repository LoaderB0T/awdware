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
      { name: 'colorCharcoalGray', value: 'rgb(26, 25, 25)' },
      { name: 'colorPaperWhite', value: 'rgb(242, 239, 234)' },
      { name: 'colorPaperGray', value: 'rgb(117, 115, 110)' },
      { name: 'colorHighlightGray', value: 'rgb(40, 40, 46)' },
      { name: 'colorHighlightColor1', value: 'rgb(255, 81, 0)' },
      { name: 'colorHighlightColor2', value: 'rgb(255, 0, 0)' },
      { name: 'colorErrorRed', value: 'rgb(238, 31, 16)' },
    ];
    return theme;
  }

  public get lightTheme(): Theme {
    const theme = new Theme('light');
    theme.props = [
      { name: 'colorCharcoalGray', value: 'rgb(249, 251, 252)' },
      { name: 'colorPaperWhite', value: 'rgba(26, 25, 25, 1)' },
      { name: 'colorPaperGray', value: 'rgb(92, 94, 96)' },
      { name: 'colorHighlightGray', value: 'rgb(40, 40, 46)' },
      { name: 'colorHighlightColor1', value: 'rgba(255, 166, 0, 1)' },
      { name: 'colorHighlightColor2', value: 'rgb(255, 72, 0)' },
      { name: 'colorErrorRed', value: 'rgb(238, 31, 16)' },
    ];
    return theme;
  }
}
