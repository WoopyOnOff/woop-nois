import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { PoolsService } from '../pools.service';
import { TournamentsService } from '../../tournaments/index';
import { Pool, Tournament } from '../../../models/index';


@Component({
  selector: 'list-pool',
  templateUrl: './list-pool.component.html',
  styleUrls: ['./list-pool.component.css']
})
export class ListPoolComponent implements OnInit {

  pools: Array<Pool> = [];
  @Input('tournament') currentTournament: Tournament;

  constructor(private poolsService: PoolsService, private tournamentsService: TournamentsService) { }

  ngOnInit() {

    if (this.currentTournament != null) {
      this.poolsService.getAllPools(this.currentTournament._id)
        .subscribe(pools => {this.pools = pools;});
    }
  }

  addPool() {
    console.log('addPool');
    let nbPools = this.pools.length;
    nbPools++;
    let pool: Pool = new Pool();
    pool.tournamentId = this.currentTournament._id;
    pool.pass= "poule-"+nbPools;
    pool.poolName=(nbPools + 9).toString(36).toUpperCase();
    console.log('call service : addPool');
    this.poolsService.addPool(pool)
      .subscribe(res => {
        console.log('addpool response : ' + res);
        //let response = JSON.parse(res);
        this.pools.push(res.object);
      });
  }

  deletePool(idpool: String) {
    console.log('deletePool : '+ idpool);
    this.poolsService.deletePool(idpool);

    let i:number = 0;
    console.log('parcours les pools');
    console.log('Poolid : ' + idpool);
    for (let pool of this.pools) {
      console.log('Pool : ' + pool._id);
      if ( pool._id == idpool) {
        console.log('Splice : ' + pool._id);
        this.pools.splice(i, 1);
      }
      i++;
    }

  }
}
