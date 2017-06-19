import { Component, OnInit, Input } from '@angular/core';
import { Pool, Team } from '../../../models/index';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  @Input('pool') pool: Pool;
  teamList: Team[];
  currentTeam: Team;

  constructor(private teamsService: TeamsService) {
    this.currentTeam = new Team();
    this.teamList = [];
  }

  ngOnInit() {
    console.log("EditTeamComponent::onInit");
    this.teamsService.getTeamsFromPool(this.pool._id)
      .subscribe(teams => {
        console.log("teams : " + JSON.stringify(teams));
        if ( teams != null ) {
          this.teamList = teams;
        }
        else {
          teams = [];
        }
      });
  }

  addTeam() {

    console.log("currentTeam : " + JSON.stringify(this.currentTeam));

    console.log("Pool : " + JSON.stringify(this.pool));
    this.currentTeam.poolId = this.pool._id;

    // In progress
    if ( this.currentTeam.isActif) {
       this.pool.nbActiveTeam++;
    }

    this.teamsService.addTeam(this.pool._id, this.currentTeam)
      .subscribe(team =>
        this.teamList.push(team))
  }

}
