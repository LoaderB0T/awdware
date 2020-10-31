import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostEditorComponent } from './blog-post-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { BlogPostResolverService } from '../services/blog-post-resolver.service';

const routes: Routes = [
  {
    path: '',
    resolve: {
      post: BlogPostResolverService
    },
    component: BlogPostEditorComponent
  },
];

@NgModule({
  declarations: [BlogPostEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BlogPostModule,
    MonacoEditorModule.forRoot()
  ],
  exports: []
})
export class AwdwareBlogEditorModule { }
