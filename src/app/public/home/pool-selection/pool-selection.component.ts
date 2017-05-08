import { Component, OnInit } from '@angular/core';
import { Tournament, Pool } from '../../../models/index';

@Component({
  selector: 'app-pool-selection',
  templateUrl: './pool-selection.component.html',
  styleUrls: ['./pool-selection.component.css']
})
export class PoolSelectionComponent implements OnInit {

  tournament: Tournament;
  poolsList: Array<Pool>;

  constructor() { }

  ngOnInit() {
  }

}
