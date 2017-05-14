import { Component, OnInit } from '@angular/core';
import { User, Tournament, Pool } from '../../models/index';
import { TournamentsComponent } from '../tournaments/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class AdminHomeComponent implements OnInit {

  currentUser: User;
  currentTournament: Tournament;
  currentPool: Pool;

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

  onEmitPool(pool: Pool) {
    console.log('Home::onEmitPool');
    this.currentPool = pool;
  }

}
