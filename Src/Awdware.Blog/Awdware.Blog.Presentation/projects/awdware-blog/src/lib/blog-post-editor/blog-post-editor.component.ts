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
}
