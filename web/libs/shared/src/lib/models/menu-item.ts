export class MenuItem {
  public key: string;
  public text: string;
  public icon: string;
  public order: number;
  public action: () => void;
  public enabled: () => boolean;
  public active: boolean = false;

  constructor(key: string, text: string, icon: string, order: number, action: () => void, enabled: () => boolean) {
    this.key = key;
    this.text = text;
    this.icon = icon;
    this.order = order;
    this.action = action;
    this.enabled = enabled;
  }
}
