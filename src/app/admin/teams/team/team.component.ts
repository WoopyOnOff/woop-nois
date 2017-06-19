import { Component, OnInit, Input } from '@angular/core';

import { Team } from '../../../models/index';
import { TeamsService } from '../teams.service';
import { PoolsService } from '../../pools/pools.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input('teamId') teamId: string;
  currentTeam: Team = new Team();

  constructor(private teamsService: TeamsService, private poolsService: PoolsService) {

  }

  ngOnInit() {
    console.log('TeamId : ' + this.teamId);
    this.teamsService.getTeamFromIdTeam(this.teamId)
      .subscribe(team => this.currentTeam = team);
  }

  deleteTeam() {
    console.log('Delete currentTeam : '+ JSON.stringify(this.currentTeam));
    // Delete the reference of the team in the pool
    this.poolsService.removeTeamFromPool(this.currentTeam._id, this.currentTeam.poolId);

    this.teamsService.deleteTeam(this.currentTeam);
  }

}
