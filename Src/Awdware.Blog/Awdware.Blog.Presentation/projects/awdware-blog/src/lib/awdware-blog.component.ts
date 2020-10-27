import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BlogPostDto } from './models/application-facade';
import { BlogService } from './services/blog.service';

@Component({
  selector: 'awd-blog',
  templateUrl: './awdware-blog.component.html',
  styleUrls: ['./awdware-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwdwareBlogComponent implements OnInit {

  private readonly _posts = new Subject<BlogPostDto[]>();
  public $posts = this._posts.asObservable();
  private readonly _blogService: BlogService;

  constructor(blogService: BlogService) {
    this._blogService = blogService;
  }

  ngOnInit(): void {
    this._blogService.getLatestPosts(0).subscribe(s => {
      this._posts.next(s);
    });
  }


}
