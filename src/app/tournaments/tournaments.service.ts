import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TournamentsService {

  constructor(private http: Http) { }

  // Get all tournaments from the API
  getAllTournaments() {
    console.log('TournamentsService::getAllTournaments');
    return this.http.get('/api/tournaments')
      .map(res => res.json());
  }

  getTournament(id : String) {
    console.log('TournamentsService::getTournament : ' + id);
    return this.http.get('/api/tournaments/'+id)
      .map(res => res.json());
  }

  deleteTournament(id: String) {
    console.log('TournamentsService::deleteTournament : ' + id);
    return this.http.delete('/api/tournaments/' + id)
      .map(res => res.json());

  }
}
