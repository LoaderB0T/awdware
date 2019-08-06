import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { SharedModule } from '../shared/shared.module';
import { VoteRoutingModule } from './vote-routing.module';
import { NewVoteComponent } from './new-vote/new-vote.component';
import { MyVotesComponent } from './my-votes/my-votes.component';



@NgModule({
  declarations: [
    VoteComponent,
    NewVoteComponent,
    MyVotesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VoteRoutingModule
  ]
})
export class VoteModule { }
