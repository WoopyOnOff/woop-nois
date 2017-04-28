import { Component, OnInit } from '@angular/core';
import { GameType, GAMELIST, Tournament } from '../../models/index';
import { TournamentsService } from '../../admin/tournaments/tournaments.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gameList: Array<GameType> = GAMELIST;
  activeTournaments: Array<Tournament>;
  publishedTournaments: Array<Tournament>;

  constructor(private tournamentsService: TournamentsService) { }

  ngOnInit() {
    this.tournamentsService.getAllActiveTournaments()
    .subscribe(tournaments => {
      this.activeTournaments = tournaments;
    });
    this.tournamentsService.getAllPublishedTournaments()
      .subscribe(tournaments => {
        this.publishedTournaments = tournaments;
      });
  }

}
