export class ColorType {
  private static colorRegex = /rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})(, \d?\.?\d)?\)/;

  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public static transition(c1: ColorType, c2: ColorType, prog: number) {
    return new ColorType(
      c1.r - (c1.r - c2.r) * prog,
      c1.g - (c1.g - c2.g) * prog,
      c1.b - (c1.b - c2.b) * prog
    );
  }

  public static fromCssPropertyString(cssProp: string) {
    const match = cssProp.match(this.colorRegex);
    return new ColorType(Number.parseInt(match[1], 10), Number.parseInt(match[2], 10), Number.parseInt(match[3], 10));
  }

  public toCssProperyString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
