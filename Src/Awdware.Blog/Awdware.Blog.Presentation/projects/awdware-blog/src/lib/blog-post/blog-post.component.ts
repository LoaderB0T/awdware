import { Component, Input } from '@angular/core';
import { RoutingService, UserDetailsService, UserPermission } from '@awdware/core';
import { BlogPostDetailsDto, BlogPostDto, BlogPostType } from '../models/application-facade';

@Component({
  selector: 'awd-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  private readonly _userService: UserDetailsService;
  private readonly _routingService: RoutingService;

  constructor(userService: UserDetailsService, routingService: RoutingService) {
    this._userService = userService;
    this._routingService = routingService;
  }

  @Input() post?: BlogPostDto | BlogPostDetailsDto;
  @Input() showEditButton: boolean = false;

  public get showEdit(): boolean {
    return this.showEditButton && this._userService.userInfo.permission === UserPermission.OPERATOR;
  }

  public get isDetails(): boolean {
    return this.post?.postType === BlogPostType.DETAILS;
  }

  public get postDetails(): BlogPostDetailsDto | undefined {
    return this.post as BlogPostDetailsDto;
  }

  public get postPreview(): BlogPostDto | undefined {
    return this.post as BlogPostDto;
  }

  public translateText(blogText: string) {
    return blogText.replace(/{{([a-zA-Z0-9-]+)}}/g, (fullMatch, contentKey) => {
      const translation = this.post?.translations.find(x => x.key === contentKey);
      if (!translation?.value) {
        console.warn(`Missing translation in blog for '${contentKey}'`);
        return `##${contentKey}##`;
      }
      return translation.value;
    });
  }

  navToBlog(postId: string) {
    this._routingService.navigate('blog', 'post', postId);
  }

  editPost(postId: string) {
    this._routingService.navigate('blog', 'post', postId, 'edit');
  }
}
