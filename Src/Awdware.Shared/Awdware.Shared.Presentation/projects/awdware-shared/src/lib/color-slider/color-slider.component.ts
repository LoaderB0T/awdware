import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { ColorType } from '../models/color-type.model';

@Component({
  selector: 'awd-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ColorSliderComponent, multi: true }]
})
export class ColorSliderComponent implements OnInit, ControlValueAccessor {
  @Input() public inputTabIndex: number;
  @Input() public name: string;
  @Input() public labelText: string;
  @Output() public valueChanged = new EventEmitter<string>();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private rgbColor: ColorType = new ColorType(0, 0, 0);
  private innerValue: string;
  public isDisabled: boolean;
  public isFocused: boolean;

  public get r(): number {
    return this.rgbColor.r;
  }
  public set r(value: number) {
    this.rgbColor.r = value;
    this.value = this.rgbColor.toHex();
  }
  public get g() {
    return this.rgbColor.g;
  }
  public set g(value: number) {
    this.rgbColor.g = value;
    this.value = this.rgbColor.toHex();
  }
  public get b() {
    return this.rgbColor.b;
  }
  public set b(value: number) {
    this.rgbColor.b = value;
    this.value = this.rgbColor.toHex();
  }

  public get previewColor() {
    return this.rgbColor.toCssProperyString();
  }

  constructor() {}

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      if (this.innerValue) {
        this.rgbColor = ColorType.fromHex(this.innerValue);
      }
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      this.rgbColor = ColorType.fromHex(this.innerValue);
      this.valueChanged.next(this.innerValue);
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

  ngOnInit() {}
}
