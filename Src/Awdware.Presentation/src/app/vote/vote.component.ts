import { Component, OnInit } from '@angular/core';
import { TabViewContent } from '../shared/models/tab-view-content';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'awd-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  public voteTabContent: TabViewContent;
  private _routingService: RoutingService;

  constructor(routingService: RoutingService) {
    this._routingService = routingService;
    this.voteTabContent = new TabViewContent();
    this.voteTabContent.tabs = [
      { id: 'my', text: 'vote.my.heading', clicked: () => this._routingService.navigateToMyVotes() },
      { id: 'new', text: 'vote.new.heading', clicked: () => this._routingService.navigateToNewVote() }
    ];
    this.voteTabContent.selectedTabId = 'my';
  }

  ngOnInit() {
  }

}
