import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';
import { TextboxComponent } from './textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { TabViewComponent } from './tab-view/tab-view.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SliderComponent } from './slider/slider.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';



@NgModule({
  declarations: [
    LoadingComponent,
    TextboxComponent,
    TabViewComponent,
    CheckboxComponent,
    SliderComponent,
    ColorSliderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    TranslateModule,
    LoadingComponent,
    TextboxComponent,
    TabViewComponent,
    CheckboxComponent,
    SliderComponent,
    ColorSliderComponent
  ]
})
export class SharedModule { }
