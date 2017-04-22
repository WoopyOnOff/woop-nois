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

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("currentUser : " + JSON.stringify(this.currentUser));
  }

  ngOnInit() {
  }

  onCreate() {
    this.currentTournament = new Tournament();
  }

  onEmitTournament(tournament : Tournament) {
    this.currentTournament = tournament;
  }

}
