import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../../environments/environment';
import { Pool } from '../../models/index';
import { JWT } from '../../common/jwt';

@Injectable()
export class PoolsService {

  constructor(private http: Http) { }

  getAllPools(idTournament: String) {
    console.log('PoolsService::getAllPools');
    return this.http.get(environment.hostnameServer+'/api/pools?idTournament='+idTournament)
      .map(res => res.json());
  }

  getPool(idPool: String) {
    console.log('PoolsServce::getPool');
    return this.http.get(environment.hostnameServer+'/api/pools/'+idPool)
      .map(res => res.json());
  }

  addPool(pool: Pool) {
    console.log('PoolsService::addPool');

    let jwtClass = new JWT();
    let header = this.jwt();
    header.append('Content-Type', 'application/json');
    let body = JSON.stringify(pool);

    return this.http.post(environment.hostnameServer+'/api/secured/pools/',
        body, {headers : header})
        .map(res => res.json())
            .subscribe(
          (data) => console.log(data),
          (err) => console.log(err));
  }

  public jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'x-access-token': currentUser.token });
          return headers;
      }

  }
}
