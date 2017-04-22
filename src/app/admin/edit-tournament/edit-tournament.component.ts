import { Component, OnInit, Input } from '@angular/core';

import { User, Tournament, GameType, GAMELIST } from '../../models/index';
import { TournamentsService } from '../tournaments/tournaments.service';

@Component({
  selector: 'edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {

  gameList: Array<GameType> = GAMELIST;
  @Input('tournament') tournament: Tournament;

  constructor(private tournamentsService: TournamentsService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(JSON.stringify(this.tournament));
    if (this.tournament._id != null) {
      this.tournamentsService.updateTournament(this.tournament);
    }
    else {
      this.tournamentsService.createTournament(this.tournament);
    }

  }
}
