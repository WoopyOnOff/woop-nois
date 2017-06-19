import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Team } from '../../models/index';
import { environment } from '../../../environments/environment';
import { JWT } from '../../common/jwt';

@Injectable()
export class TeamsService {

  constructor(private http: Http) { }

  getTeamsFromPool(idPool : string) : Observable<Array<Team>> {

    return this.http.get(environment.hostnameServer+'/api/teams?idPool='+idPool)
      .map(
        res => res.json()
      );
  }

  getTeamFromIdTeam(idTeam : string) : Observable<Team> {
    console.log('getTeamFromIdTeam('+idTeam+')');
    return this.http.get(environment.hostnameServer+'/api/teams/'+idTeam)
    .map(
      res => {
        console.log("teamsService:getTeam : " + JSON.stringify(res));
        return res.json();
      }
    );
  }

  addTeam(idPool: string, team: Team): Observable<Team> {

    console.log('AddTeam : ' + JSON.stringify(team));
    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');
    let body = JSON.stringify(team);

    return this.http.post(environment.hostnameServer+'/api/secured/teams?idPool='+idPool
      , body, {headers: header})
      .map( res => {
        return res.json().object;
      });
  }

  deleteTeam(team: Team) {

    console.log('deleteTeam');

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');

    return this.http.delete(environment.hostnameServer+'/api/secured/teams/'+team._id
      , {headers: header})
      .map(res => res.json())
          .subscribe(
        (data) => console.log(data),
        (err) => console.log(err));
  }

}
