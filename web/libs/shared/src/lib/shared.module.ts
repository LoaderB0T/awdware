import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingComponent } from './loading/loading.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SliderComponent } from './slider/slider.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { SelectComponent } from './select/select.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    LoadingComponent,
    TextboxComponent,
    TabViewComponent,
    CheckboxComponent,
    SliderComponent,
    ColorSliderComponent,
    SelectComponent,
    LogoComponent
  ],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [
    TranslateModule,
    LoadingComponent,
    TextboxComponent,
    TabViewComponent,
    CheckboxComponent,
    SliderComponent,
    ColorSliderComponent,
    SelectComponent,
    LogoComponent
  ]
})
export class SharedModule {
  constructor() {
    console.log('constructor: SharedModule');
  }
}
