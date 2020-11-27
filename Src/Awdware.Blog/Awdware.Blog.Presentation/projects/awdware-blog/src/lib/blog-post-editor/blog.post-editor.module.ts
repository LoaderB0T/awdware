import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostEditorComponent } from './blog-post-editor.component';
import { FormsModule } from '@angular/forms';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

const routes: Routes = [
  {
    path: '',
    component: BlogPostEditorComponent
  },
];

const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
};

@NgModule({
  declarations: [BlogPostEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    BlogPostModule
  ],
  exports: []
})
export class AwdwareBlogEditorModule { }
