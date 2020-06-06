export class Theme {
  public name: string;
  public props: Array<ThemeProperty>;

  constructor(name: string) {
    this.name = name;
    this.props = new Array<ThemeProperty>();
  }

  toRules(): string {
    return this.props.map(prop => {
      return `--${prop.name}: ${prop.value}`;
    }).join(';');
  }
}

export class ThemeProperty {
  public name: string;
  public value: string;
}
