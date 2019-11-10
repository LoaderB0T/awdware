import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ThemeService } from '../services/theme.service';
import { ColorType } from '../models/color-type.model';

@Component({
  selector: 'awd-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SliderComponent, multi: true },
  ]
})
export class SliderComponent implements OnInit, ControlValueAccessor {
  @Input() public min: number;
  @Input() public max: number = 524288;
  @Input() public inputTabIndex: number;
  @Input() public name: string;
  @Input() public minColor: string;
  @Input() public maxColor: string;
  @Input() public labelText: string;

  @Output() public valueChanged = new EventEmitter<number>();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private _sanitizer: DomSanitizer;
  private _theme: ThemeService;
  public isDisabled: boolean;
  public innerValue: number;
  public isFocused: boolean;
  public cssVariables: SafeStyle;

  constructor(sanitizer: DomSanitizer, themeService: ThemeService) {
    this._sanitizer = sanitizer;
    this._theme = themeService;
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.refreshStyles();
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.refreshStyles();
      this.valueChanged.next(this.innerValue);
    }
  }

  private refreshStyles() {
    this.cssVariables = this._sanitizer.bypassSecurityTrustStyle(
      `--slider-color: ${this.getCalculatedColor()};
    --slider-background: ${this._theme.getColor('colorMainBg')};`);
  }

  private getCalculatedColor(): string {
    if (this.minColor) {
      if (this.maxColor) {

        const color1 = ColorType.fromCssPropertyString(this.minColor);
        const color2 = ColorType.fromCssPropertyString(this.maxColor);

        const ratio = this.value / this.max;

        const colorRes = ColorType.transition(color1, color2, ratio);

        return colorRes.toCssProperyString();
      } else {
        return this.minColor;
      }
    } else {
      return this._theme.getColor('colorHighlightColor1');
    }


  }

  onBlur() {
    this.isFocused = false;
    this.onTouchedCallback();
  }

  onFocus() {
    this.isFocused = true;
  }


  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {
  }

}
