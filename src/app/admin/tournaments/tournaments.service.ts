import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import { Tournament } from '../../models/index';
import { JWT } from '../../common/jwt';

@Injectable()
export class TournamentsService {

  private updateComponentSource = new Subject<Tournament>();

  updateComponentSource$ = this.updateComponentSource.asObservable();

  constructor(private http: Http) {}

  ///// PUBLIC API /////

  // Get all tournaments from the API
  getAllTournaments() {
    console.log('TournamentsService::getAllTournaments');
    return this.http.get(environment.hostnameServer+'/api/tournaments')
      .map(res => res.json());
  }

  getAllActiveTournaments() {
    console.log('TournamentsService::getAllActiveTournaments');
    return this.http.get(environment.hostnameServer+'/api/tournaments?isActif=true')
      .map(res => res.json());
  }

  getAllPublishedTournaments() {
    console.log('TournamentsService::getAllPublishedTournaments');
    return this.http.get(environment.hostnameServer+'/api/tournaments?isPublished=true')
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

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');
    let body = JSON.stringify(tournament);
    return this.http.post(environment.hostnameServer+'/api/secured/tournaments/', body,
      {headers : header})
      .map(res => res.json());
        //   .subscribe(
        // (data) => console.log(data),
        // (err) => console.log(err));
  }

  updateTournament(tournament: Tournament) {
    console.log('TournamentsService::updateTournament : ' + tournament._id);

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');

    let body = JSON.stringify(tournament);
    return this.http.put(environment.hostnameServer+'/api/secured/tournaments/'+tournament._id,
        body, {headers : header} )
      .map(res => {
        console.log("Result status : " + JSON.stringify(res.status));
        res.json();})
        .catch(this.handleError);
      // .catch((error: any) => {
      //   console.log('catch error : ' + error);
      //   return Observable.throw(error.json().error || 'Server error');
      // });
        //   .subscribe(
        // (data) => console.log("Data : " + data),
        // (err) => {console.log("Erreur : " + err); return false;});

  }

  deleteTournament(id: String) {
    console.log('TournamentsService::deleteTournament : ' + id);

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    return this.http.delete(environment.hostnameServer+'/api/secured/tournaments/' + id, {headers : header})
      .map(res => res.json());

  }

  updateComponent(tournament: Tournament) {
    this.updateComponentSource.next(tournament);
  }

  handleError(error:any) {
      console.error(error);
      return Observable.throw(error);
  }
}
