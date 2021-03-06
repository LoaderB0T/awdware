import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LenID } from '../../.gah/dependencies/shared/public-api';
import { BlogPostDetailsDto } from '../models/application-facade';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'awd-blog-post-editor',
  templateUrl: './blog-post-editor.component.html',
  styleUrls: ['./blog-post-editor.component.scss']
})
export class BlogPostEditorComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute;
  editorOptions = { theme: 'vs-dark', language: 'html' };
  private readonly _postCache: { locale: string; post: BlogPostDetailsDto }[];
  private readonly _blogService: BlogService;
  private _currentLocale: LenID = 'de_DE';
  public post: BlogPostDetailsDto;

  constructor(activatedRoute: ActivatedRoute, blogService: BlogService) {
    this._activatedRoute = activatedRoute;
    this._blogService = blogService;
    this._postCache = new Array<{ locale: string; post: BlogPostDetailsDto }>();
  }

  ngOnInit(): void {
    this.loadPost().subscribe();
  }

  private loadPost() {
    const loadingLocale = this._currentLocale;

    const cached = this._postCache.find(x => x.locale === loadingLocale);
    if (cached) {
      this.post = cached.post;
      return of(cached.post);
    }

    return this._blogService.getPostDetails(this._activatedRoute.snapshot.params['id'], loadingLocale).pipe(
      tap(x => {
        const existing = this._postCache.findIndex(x => x.locale === loadingLocale);
        if (existing !== -1) {
          this._postCache[existing].post = x;
        } else {
          this._postCache.push({ locale: loadingLocale, post: x });
        }
        this.post = x;
      })
    );
  }

  switchLocale() {
    this._currentLocale = this._currentLocale === 'en_US' ? 'de_DE' : 'en_US';
    this.loadPost().subscribe();
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
