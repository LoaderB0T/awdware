export class ColorType {
  private static readonly colorRegex = new RegExp('rgba?\\((\\d{1,3}), (\\d{1,3}), (\\d{1,3})(, \\d?.?\\d)?\\)');
  public r: number;
  public g: number;
  public b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public static transition(c1: ColorType, c2: ColorType, prog: number) {
    return new ColorType(c1.r - (c1.r - c2.r) * prog, c1.g - (c1.g - c2.g) * prog, c1.b - (c1.b - c2.b) * prog);
  }

  public static fromCssPropertyString(cssProp: string) {
    const match = cssProp.match(this.colorRegex);
    return new ColorType(Number.parseInt(match![1]!, 10), Number.parseInt(match![2]!, 10), Number.parseInt(match![3]!, 10));
  }

  public static fromHex(hex: string) {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    // tslint:disable-next-line:no-bitwise
    const r = (bigint >> 16) & 255;
    // tslint:disable-next-line:no-bitwise
    const g = (bigint >> 8) & 255;
    // tslint:disable-next-line:no-bitwise
    const b = bigint & 255;

    const returnCol = new ColorType(r, g, b);
    return returnCol;
  }

  public toHex(): string {
    // tslint:disable-next-line:no-bitwise
    return `#${((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)}`;
  }

  public toCssProperyString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
