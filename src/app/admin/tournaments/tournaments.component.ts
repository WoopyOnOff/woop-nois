import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { TournamentsService } from './tournaments.service';
import { PoolsService } from '../pools/pools.service';
import { User ,Tournament, GameType, GAMELIST } from '../../models/index';

@Component({
  selector: 'tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  @Output() onEmitTournament = new EventEmitter<Tournament>();
  tournaments: Array<Tournament> = [];
  gameTypes: Array<GameType> = GAMELIST;

  constructor(private tournamentsService: TournamentsService,
    private poolsService: PoolsService) {

    tournamentsService.updateComponentSource$.subscribe(
          tournament => {
            console.log("le tournoi a été mise à jour : " + JSON.stringify(tournament));
            let i = 0;
            let index = -1;
            for (let tournoi of this.tournaments) {

              if ( tournoi._id == tournament._id) {
                index = i;
              }
              i++;
            }

            if ( index == -1) {
              this.tournaments[i] = tournament;
            }
            else{
              this.tournaments[index] = tournament;
            }

          });

  }

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
      console.log('Delete the pools of the tournament : ' + id);
      this.poolsService.getAllPools(id).subscribe(pools => {
        for (let pool of pools) {
          this.poolsService.deletePool(pool._id);
        }
      });
  }
}
