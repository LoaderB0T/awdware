import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostDetailsDto } from '../models/application-facade';

@Component({
  selector: 'awd-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.scss']
})
export class BlogPostEditorComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute;
  editorOptions = { theme: 'vs-dark', language: 'html' };

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
  }

  public get post(): BlogPostDetailsDto {
    return this._activatedRoute.snapshot.data['post'];
  }

  public get code(): string {
    return this.post.content.replace(/{{([a-zA-Z0-9-]+)}}/g, (fullMatch, contentKey) => {
      const translation = this.post.translations.find(x => x.key === contentKey);
      return `{{${contentKey}{${translation.value ?? ''}}}}`;
    });
  }

  public set code(value: string) {
    this.post.translations = [];
    this.post.content = value.replace(/{{([a-zA-Z0-9-]+){([\S\s]*?)}}}/g, (fullMatch, contentKey, contentValue) => {
      this.post.translations.push({
        key: contentKey,
        value: contentValue
      });
      return `{{${contentKey}}}`;
    });
  }
}
