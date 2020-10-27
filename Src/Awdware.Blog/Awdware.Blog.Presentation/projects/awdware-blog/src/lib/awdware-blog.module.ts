import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwdwareBlogComponent } from './awdware-blog.component';

const routes: Routes = [
  {
    path: '',
    component: AwdwareBlogComponent

  }
];

@NgModule({
  declarations: [AwdwareBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [AwdwareBlogComponent]
})
export class AwdwareBlogModule { }
