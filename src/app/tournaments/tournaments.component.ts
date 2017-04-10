import { Component, OnInit } from '@angular/core';
import { TournamentsService } from './tournaments.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments: any = [];

  constructor(private tournamentsService: TournamentsService) { }

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
        this.tournaments = [tournament];
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
