import { Component, Input, OnInit } from '@angular/core';
import { RoutingService, UserDetailsService, UserPermission } from '@awdware/awdware-core';
import { BlogPostDetailsDto, BlogPostDto, BlogPostType } from '../models/application-facade';

@Component({
  selector: 'awd-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  private readonly _userService: UserDetailsService;
  private readonly _routingService: RoutingService;

  constructor(userService: UserDetailsService, routingService: RoutingService) {
    this._userService = userService;
    this._routingService = routingService;
  }

  @Input() post: BlogPostDto | BlogPostDetailsDto;
  @Input() hideEditIcon: boolean;

  public get showEdit(): boolean {
    return !this.hideEditIcon && this._userService.userInfo.permission === UserPermission.OPERATOR;
  }

  public get isDetails(): boolean {
    return this.post.postType === BlogPostType.DETAILS;
  }

  public get postDetails(): BlogPostDetailsDto {
    return this.post as BlogPostDetailsDto;
  }

  public get postPreview(): BlogPostDto {
    return this.post as BlogPostDto;
  }

  ngOnInit(): void {
  }

  navToBlog(postId: string) {
    this._routingService.navigate('blog', 'post', postId);
  }

  editPost(postId: string) {
    this._routingService.navigate('blog', 'post', postId, 'edit');
  }

}
