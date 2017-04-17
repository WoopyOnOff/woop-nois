import { Component, OnInit } from '@angular/core';
import { GameType, GAMELIST } from '../../models/index';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gameList: Array<GameType> = GAMELIST;

  constructor() { }

  ngOnInit() {
  }

}
