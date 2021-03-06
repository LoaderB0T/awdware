import { Injectable } from '@angular/core';
import { WebApiService, LenID, TranslationService } from '@awdware/shared';
import { Observable } from 'rxjs';
import { BlogPostDetailsDto, BlogPostDto } from '../models/application-facade';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly _webApiService: WebApiService;
  private readonly _translationService: TranslationService;

  constructor(webApiService: WebApiService, translationService: TranslationService) {
    this._webApiService = webApiService;
    this._translationService = translationService;
  }

  public getLatestPosts(skipCount: number) {
    return this._webApiService.get<BlogPostDto[]>(`blog/posts/${skipCount}/${this._translationService.lenID}`);
  }

  public getPostDetails(postId: string, lenID?: LenID): Observable<BlogPostDetailsDto> {
    return this._webApiService.get<BlogPostDetailsDto>(`blog/post/${postId}/${lenID ?? this._translationService.lenID}`);
  }
}
