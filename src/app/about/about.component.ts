import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader: Leader;
  leaders: Leader[];
  constructor(private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
