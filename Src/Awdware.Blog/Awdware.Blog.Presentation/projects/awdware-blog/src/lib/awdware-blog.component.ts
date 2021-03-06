import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetailsService, UserPermission } from '@awdware/core';
import { BlogPostDto } from './models/application-facade';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'awd-blog',
  templateUrl: './awdware-blog.component.html',
  styleUrls: ['./awdware-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwdwareBlogComponent implements OnInit {
  private readonly _blogService: BlogService;
  private readonly _userService: UserDetailsService;

  private readonly _posts = new Subject<BlogPostDto[]>();
  public $posts = this._posts.asObservable();

  constructor(blogService: BlogService, userService: UserDetailsService) {
    this._blogService = blogService;
    this._userService = userService;
  }

  public get showEdit(): boolean {
    return this._userService.userInfo.permission === UserPermission.OPERATOR;
  }

  ngOnInit(): void {
    this._blogService.getLatestPosts(0, 'de').subscribe(s => {
      this._posts.next(s);
    });
  }
}
