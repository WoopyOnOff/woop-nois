import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';


@Injectable()
export class TournamentsService {

  constructor(private http: Http) { }

  ///// PUBLIC API /////

  // Get all tournaments from the API
  getAllTournaments() {
    console.log('TournamentsService::getAllTournaments');
    return this.http.get(environment.hostnameServer+'/api/tournaments')
      .map(res => res.json());
  }

  getTournament(id : String) {
    console.log('TournamentsService::getTournament : ' + id);
    return this.http.get(environment.hostnameServer+'/api/tournaments/'+id)
      .map(res => res.json());
  }

  ///// PROTECTED API /////

  deleteTournament(id: String) {
    console.log('TournamentsService::deleteTournament : ' + id);

    return this.http.delete(environment.hostnameServer+'/api/tournaments/' + id, this.jwt())
      .map(res => res.json());

  }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'x-access-token': currentUser.token });
            return new RequestOptions({ headers: headers });
        }

    }
}
