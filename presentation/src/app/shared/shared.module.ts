import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';
import { TextboxComponent } from './textbox/textbox.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoadingComponent,
    TextboxComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    TranslateModule,
    LoadingComponent,
    TextboxComponent
  ]
})
export class SharedModule { }
