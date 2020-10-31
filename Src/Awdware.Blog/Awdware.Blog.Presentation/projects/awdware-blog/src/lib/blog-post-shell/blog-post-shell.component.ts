import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostDetailsDto } from '../models/application-facade';

@Component({
  selector: 'awd-blog-post-shell',
  templateUrl: './blog-post-shell.component.html',
  styleUrls: ['./blog-post-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostShellComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {
    this._activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
  }

  public get post(): BlogPostDetailsDto {
    return this._activatedRoute.snapshot.data['post'];
  }
}
