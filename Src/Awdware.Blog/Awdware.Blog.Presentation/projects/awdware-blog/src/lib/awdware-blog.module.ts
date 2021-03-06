import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwdwareBlogComponent } from './awdware-blog.component';
import { BlogPostShellComponent } from './blog-post-shell/blog-post-shell.component';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogPostResolverService } from './services/blog-post-resolver.service';

export const blogRoutes: Routes = [
  {
    path: '',
    component: AwdwareBlogComponent
  },
  {
    path: 'post/:id',
    resolve: {
      post: BlogPostResolverService
    },
    component: BlogPostShellComponent
  },
  {
    path: 'post/:id/edit',
    loadChildren: () => import('./blog-post-editor/blog.post-editor.module').then(x => x.AwdwareBlogEditorModule)
  }
];

@NgModule({
  declarations: [AwdwareBlogComponent, BlogPostShellComponent],
  imports: [CommonModule, BlogPostModule, RouterModule.forChild(blogRoutes)],
  exports: []
})
export class AwdwareBlogModule {
  constructor() {
    console.log('constructor: AwdwareBlogModule');
  }
}
