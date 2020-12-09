import { Injectable } from '@angular/core';
import { WebApiService } from '@awdware/shared';
import { Observable } from 'rxjs';
import { BlogPostDetailsDto, BlogPostDto } from '../models/application-facade';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly _webApiService: WebApiService;

  constructor(webApiService: WebApiService) {
    this._webApiService = webApiService;
  }

  public getLatestPosts(skipCount: number, locale: string) {
    return this._webApiService.get<BlogPostDto[]>(`blog/posts/${skipCount}/${locale}`);
  }

  public getPostDetails(postId: string, locale: string): Observable<BlogPostDetailsDto> {
    return this._webApiService.get<BlogPostDetailsDto>(`blog/post/${postId}/${locale}`);
  }
}
