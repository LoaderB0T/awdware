import { Component, OnInit, Input } from '@angular/core';
import { TabViewContent } from '../models/tab-view-content';
import { TabViewTab } from '../models/tab-view-tab';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'awd-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute;
  @Input()
  public content?: TabViewContent;
  private readonly _sanitizer: DomSanitizer;

  constructor(activatedRoute: ActivatedRoute, sanitizer: DomSanitizer) {
    this._activatedRoute = activatedRoute;
    this._sanitizer = sanitizer;
  }

  ngOnInit() {
    this._activatedRoute.url.subscribe(() => {
      if (!this.content) {
        return;
      }
      this.content.selectedTabId = this._activatedRoute.snapshot.firstChild?.url[0]?.path ?? this.content.selectedTabId;
    });
  }

  public get cssVariablesStyle() {
    return this._sanitizer.bypassSecurityTrustStyle(`--tabCount: ${this.content?.tabs.length ?? 1};`);
  }

  public selectTab(tab: TabViewTab) {
    tab.clicked();
  }
}
