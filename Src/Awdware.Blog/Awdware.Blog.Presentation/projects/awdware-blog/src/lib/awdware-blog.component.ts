import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetailsService, UserPermission } from '@awdware/core';
import { FacadeService } from '@awdware/shared';
import { BlogPostDto } from './models/application-facade';
import { BlogService } from './services/blog.service';
import { environment } from './environment';

@Component({
  selector: 'awd-blog',
  templateUrl: './awdware-blog.component.html',
  styleUrls: ['./awdware-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwdwareBlogComponent implements OnInit {
  private readonly _blogService: BlogService;
  private readonly _userService: UserDetailsService;
  private readonly _facadeService: FacadeService;

  private readonly _posts = new Subject<BlogPostDto[]>();
  public $posts = this._posts.asObservable();

  constructor(blogService: BlogService, userService: UserDetailsService, facadeService: FacadeService) {
    this._blogService = blogService;
    this._userService = userService;
    this._facadeService = facadeService;
  }

  public get showEdit(): boolean {
    return this._userService.userInfo.permission === UserPermission.OPERATOR;
  }

  public get blogsEnabled(): boolean {
    return environment.enableBlogs;
  }

  ngOnInit(): void {
    this._blogService.getLatestPosts(0).subscribe(s => {
      this._posts.next(s);
    });
    this._facadeService.setActiveMenuItem('blog');
  }
}
