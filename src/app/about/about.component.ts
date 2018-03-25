import { Component, OnInit } from '@angular/core';

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
  constructor(private leaderservice: LeaderService) { }

  ngOnInit() {
    this.leader = this.leaderservice.getFeaturedLeader();
    this.leaders = this.leaderservice.getLeaders();
  }

}
