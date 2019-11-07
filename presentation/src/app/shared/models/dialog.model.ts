import { InputType } from './input-type';

export class Dialog {
  public rows: DialogRow[];
  constructor() {
    this.rows = new Array<DialogRow>();
  }
}

export class DialogRow {
  public elements: DialogElement[];
  constructor() {
    this.elements = new Array<DialogElement>();
  }
}

export class DialogElement {
  public relativeWidth?: number;
  public type: DialogElementType;

  constructor(type: DialogElementType, relativeWidth = 1) {
    this.type = type;
    this.relativeWidth = relativeWidth;
  }
}

export class DialogElementTextBox extends DialogElement {
  public model: string;
  public label?: string;
  public constraint: InputType = InputType.TEXT;
  public minValue: number;
  public maxValue: number;

  constructor(label: string, model: string, relativeWidth = 1) {
    super(DialogElementType.TEXTBOX, relativeWidth);
    this.label = label;
    this.model = model;
  }
}

export class DialogElementCheckBox extends DialogElement {
  public model: boolean;
  public label?: string;

  constructor(label: string, model: boolean, relativeWidth = 1) {
    super(DialogElementType.CHECKBOX, relativeWidth);
    this.label = label;
    this.model = model;
  }
}

export class DialogElementText extends DialogElement {
  public label: string;

  constructor(label: string, relativeWidth = 1) {
    super(DialogElementType.TEXT, relativeWidth);
    this.label = label;
  }
}

export class DialogElementButton extends DialogElement {
  public actionCallback: () => void;
  public enabledCallback: () => boolean;
  public hideDialogOnAction: boolean;
  public label: string;

  constructor(label: string, actionCallback: () => void, hideDialogOnAction = false, relativeWidth = 1) {
    super(DialogElementType.BUTTON, relativeWidth);
    this.label = label;
    this.actionCallback = actionCallback;
    this.hideDialogOnAction = hideDialogOnAction;
  }
}

export enum DialogElementType {
  UNKNOWN = 0,
  TEXTBOX = 1,
  CHECKBOX = 2,
  BUTTON = 3,
  TEXT = 4
}
