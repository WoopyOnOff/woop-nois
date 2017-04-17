import { Component, OnInit } from '@angular/core';
import { User, Tournament } from '../../models/index';
import { TournamentsComponent, TournamentsService } from '../tournaments/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TournamentsService]
})
export class AdminHomeComponent implements OnInit {

  currentUser: User;
  currentTournament: Tournament;
  currentLabel: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  onEmitTournament(tournament : Tournament) {
    console.log("tournament : " + JSON.stringify(tournament));
    this.currentTournament = tournament;
    this.currentLabel = tournament.label;
  }

}
