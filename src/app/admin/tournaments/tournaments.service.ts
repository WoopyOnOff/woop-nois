import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Tournament } from '../../models/index';

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

  createTournament(tournament: Tournament) {
    console.log('TournamentsService::createTournament');

    let header = this.jwt();
    header.append('Content-Type', 'application/json');
    let body = JSON.stringify(tournament);
    return this.http.post(environment.hostnameServer+'/api/secured/tournaments/', body,
      { headers: header })
      .map(res => res.json())
          .subscribe(
        (data) => console.log(data),
        (err) => console.log(err));
  }

  updateTournament(tournament: Tournament) {
    console.log('TournamentsService::updateTournament : ' + tournament._id);

    let header = this.jwt();
    header.append('Content-Type', 'application/json');

    let body = JSON.stringify(tournament);
    return this.http.put(environment.hostnameServer+'/api/secured/tournaments/'+tournament._id,
        body,
        { headers: header })
      .map(res => res.json())
          .subscribe(
        (data) => console.log(data),
        (err) => console.log(err));

  }

  deleteTournament(id: String) {
    console.log('TournamentsService::deleteTournament : ' + id);

    let header = this.jwt();
    return this.http.delete(environment.hostnameServer+'/api/secured/tournaments/' + id, { headers: header })
      .map(res => res.json());

  }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'x-access-token': currentUser.token });
            return headers;
        }

    }
}
