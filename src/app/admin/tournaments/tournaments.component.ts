import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { TournamentsService } from './tournaments.service';
import { User ,Tournament, GameType, GAMELIST } from '../../models/index';

@Component({
  selector: 'tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  @Input() selectedTournament: Tournament;
  @Output() onEmitTournament = new EventEmitter<Tournament>();
  tournaments: Array<Tournament> = [];
  gameTypes: Array<GameType> = GAMELIST;

  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit() {
    // Retrieve posts from the API
    this.tournamentsService.getAllTournaments().subscribe(tournaments => {
      this.tournaments = tournaments;
    });
  }

  onShow(id: String) {
    console.log('Show the tournament : ' + id);
    this.tournamentsService.getTournament(id)
      .subscribe(tournament => {
        this.onEmitTournament.emit(tournament);
      });
  }

  onDelete(id: String) {
    console.log('Delete the tournament : ' + id);
    this.tournamentsService.deleteTournament(id)
      .subscribe(tournament =>  {
        this.tournamentsService.getAllTournaments().subscribe(tournaments => {
          this.tournaments = tournaments;
        });
      });
  }
}
