import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { User, Tournament, GameType, GAMELIST } from '../../models/index';
import { TournamentsService } from '../tournaments/tournaments.service';

@Component({
  selector: 'edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit, OnDestroy {

  gameList: Array<GameType> = GAMELIST;
  @Input('tournament') tournament: Tournament;
  subscription: Subscription;

  constructor(private tournamentsService: TournamentsService) {
    }

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
    this.tournamentsService.updateComponent(this.tournament);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
