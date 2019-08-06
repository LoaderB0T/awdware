import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';
import { TextboxComponent } from './textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { TabViewComponent } from './tab-view/tab-view.component';



@NgModule({
  declarations: [
    LoadingComponent,
    TextboxComponent,
    TabViewComponent
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
    TabViewComponent
  ]
})
export class SharedModule { }
