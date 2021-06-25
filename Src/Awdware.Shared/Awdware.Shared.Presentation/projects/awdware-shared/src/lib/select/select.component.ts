import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, noop } from 'rxjs';
import { SelectOption } from '../models/select-option.model';
import { InvalidOperationError } from '../models/invalid-operation-error';

@Component({
  selector: 'awd-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true }]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  public isVisible: boolean = false;
  public id: string;

  private readonly _opened = new Subject();
  public contentWidth: number = 100;
  public contentTop: number = 100;
  public contentLeft: number = 100;
  public opened = this._opened.asObservable();

  private _value: string = '';
  private _isFocused: boolean = false;
  private _isDisabled: boolean = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @ViewChild('selectButton') selectButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('selectContent') selectContent?: ElementRef<HTMLDivElement>;

  @Input() public options: SelectOption[] = [];
  @Input() public isReadOnly: boolean = false;
  @Input() public label: string = '';
  @Input() public set triggerChangeDetection(value: number) {
    this.ref.detectChanges();
  }

  @Output() selectionChanged = new EventEmitter<string>();
  @Output() toggled = new EventEmitter<boolean>();

  constructor(private readonly ref: ChangeDetectorRef) {
    this.id = Math.random().toString(36).slice(2);
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  onBlur() {
    this._isFocused = false;
    this.onTouchedCallback();
  }

  onFocus() {
    this._isFocused = true;
  }

  writeValue(value: any) {
    this._value = value;
    this.ref.detectChanges();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private measureLength(text: string): number {
    const ruler = document.getElementById('ruler')!;
    ruler.innerHTML = text;
    return ruler.offsetWidth;
  }

  ngOnInit(): void {
    this.ref.detach();
    this.ref.detectChanges();
    // setInterval(() => {
    //   this.ref.detectChanges();
    // }, 1000);
  }

  public detectChanges() {
    this.ref.detectChanges();
  }

  public toggleSelect(selectId: string) {
    if (this.isReadOnly) {
      return;
    }

    if (this.isVisible && selectId !== this.id) {
      this.isVisible = false;
    } else {
      this.calculateWidth();

      this.isVisible = !this.isVisible;

      this.ref.detectChanges();

      const btnY = this.selectButton!.nativeElement.getClientRects()[0].top;
      const btnX = this.selectButton!.nativeElement.getClientRects()[0].left;
      const btnHeight = this.selectButton!.nativeElement.getClientRects()[0].height;
      const contentHeight = this.selectContent!.nativeElement.clientHeight;

      this.contentTop = btnY - contentHeight;
      if (contentHeight + btnY + btnHeight > window.innerHeight) {
        this.contentTop = btnY - contentHeight - 2;
      } else {
        this.contentTop = btnY + btnHeight;
      }
      this.contentLeft = btnX;
    }

    if (this.isVisible) {
      this._opened.next();
    }
    this.toggled.next(this.isVisible);
    this.ref.detectChanges();
  }

  private calculateWidth() {
    this.contentWidth = this.selectButton!.nativeElement.clientWidth;
    if (this.options) {
      this.options.forEach(option => {
        // 36 = magic number that is the span width (inc. padding / border, etc.)
        const width = this.measureLength(option.text) + 36;
        if (width > this.contentWidth) {
          this.contentWidth = width;
        }
      });
    }
    // max 10px to the right window border
    const maxWidth = window.innerWidth - this.selectButton!.nativeElement.getClientRects()[0].left - 10;
    if (this.contentWidth > maxWidth) {
      this.contentWidth = maxWidth;
    }
  }

  public get hasOptions(): boolean {
    return this.options && this.options.length > 0;
  }

  public get displayText(): string {
    if (!this._value) {
      return '';
    }
    const optionItem = this.options.find(x => x.key === this._value);
    return optionItem!.text;
  }

  public onClickedOutside() {
    if (this.isVisible) {
      this.isVisible = false;
      this.ref.detectChanges();
      this.toggled.next(this.isVisible);
    }
  }

  public selectOption(option: SelectOption) {
    if (this.isReadOnly) {
      throw new InvalidOperationError('Project is readonly');
    }
    this._value = option.key;
    this.isVisible = false;
    this.onChangeCallback(this._value);
    this.toggled.next(this.isVisible);
    this.ref.detectChanges();
  }
}
