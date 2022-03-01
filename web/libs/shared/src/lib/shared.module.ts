import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoadingComponent } from './loading/loading.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SliderComponent } from './slider/slider.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { SelectComponent } from './select/select.component';
import { LogoComponent } from './logo/logo.component';

export class SharedConfig {
  apiUrl!: string;
}

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
    FormsModule
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
export class SharedModule {
  constructor() {
    console.log('constructor: SharedModule');
  }

  public static forRoot(cfg: SharedConfig): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [{ provide: SharedConfig, useValue: cfg }]
    };
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}