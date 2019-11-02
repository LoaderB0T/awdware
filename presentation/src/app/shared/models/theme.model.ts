export class Theme {
  public name: string;
  public props: Array<ThemeProperty>;

  constructor(name: string) {
    this.name = name;
    this.props = new Array<ThemeProperty>();
  }
}

export class ThemeProperty {
  public name: string;
  public value: string;
}
