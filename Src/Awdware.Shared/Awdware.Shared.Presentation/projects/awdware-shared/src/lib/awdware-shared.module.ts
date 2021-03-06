import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClickOutsideModule } from 'ng-click-outside';

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
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ClickOutsideModule
  ],
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
export class AwdwareCoreSharedModule {
  constructor() {
    console.log('constructor: AwdwareCoreSharedModule');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
