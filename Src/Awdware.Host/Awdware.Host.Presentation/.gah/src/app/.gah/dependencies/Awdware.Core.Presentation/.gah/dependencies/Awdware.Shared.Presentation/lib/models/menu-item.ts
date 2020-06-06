export class MenuItem {
  public text: string;
  public icon: string;
  public action: () => void;
  public enabled: () => boolean;

  constructor(text: string, icon: string, action: () => void, enabled: () => boolean) {
    this.text = text;
    this.icon = icon;
    this.action = action;
    this.enabled = enabled;
  }
}
