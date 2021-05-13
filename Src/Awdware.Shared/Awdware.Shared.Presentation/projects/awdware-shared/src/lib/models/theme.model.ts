export class Theme {
  public name: string;
  public props: Array<ThemeProperty>;

  constructor(name: string) {
    this.name = name;
    this.props = new Array<ThemeProperty>();
  }

  toRules(): string {
    return this.props
      .map(prop => {
        return `--${prop.name}: ${prop.value}`;
      })
      .join(';');
  }
}

export interface ThemeProperty {
  name: string;
  value: string;
}
