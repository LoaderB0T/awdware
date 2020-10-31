import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPostDetailsDto } from '../models/application-facade';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostResolverService implements Resolve<BlogPostDetailsDto> {
  private readonly _blogService: BlogService;

  constructor(blogService: BlogService) {
    this._blogService = blogService;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BlogPostDetailsDto> {
    return this._blogService.getPostDetails(route.params['id'], 'de');
  }
}
