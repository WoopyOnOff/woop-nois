import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Pool } from '../../models/index';
import { JWT } from '../../common/jwt';

@Injectable()
export class PoolsService {

  constructor(private http: Http) { }

  getAllPools(idTournament: String) :Observable<Array<Pool>>{
    console.log('PoolsService::getAllPools');
    return this.http.get(environment.hostnameServer+'/api/pools?idTournament='+idTournament)
      .map(res => res.json());
  }

  getPool(idPool: String) :Observable<Pool> {
    console.log('PoolsService::getPool');
    return this.http.get(environment.hostnameServer+'/api/pools/'+idPool)
      .map(res => res.json());
  }

  addPool(pool: Pool) {
    console.log('PoolsService::addPool');

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');
    let body = JSON.stringify(pool);

    return this.http.post(environment.hostnameServer+'/api/secured/pools/',
        body, {headers : header})
        .map(res => {
          console.log('Response : ' + res);
          return res.json();
        });
          //   .subscribe(
          // (data) => console.log(data),
          // (err) => console.log(err));
  }

  updatePool(pool: Pool) {
    console.log('PoolsService::updatePool : '+ pool._id);

    let jwtClass = new JWT();
    let header = jwtClass.jwt();
    header.append('Content-Type', 'application/json');

    let body = JSON.stringify(pool);
    return this.http.put(environment.hostnameServer+'/api/secured/pools/'+pool._id,
        body, {headers : header})
      .map(res => {
        console.log("Result status : " + JSON.stringify(res.status));
        return res.json();
      });
        //.catch(this.handleError);

  }

  deletePool(idPool: String) {
    console.log('PoolsService::deletePool');

    let jwtClass = new JWT();
    let header = jwtClass.jwt();

    return this.http.delete(environment.hostnameServer+'/api/secured/pools/'+idPool,
      {headers : header})
      .map(res => res.json())
          .subscribe(
        (data) => console.log(data),
        (err) => console.log(err));
  }

  private handleError(error:any) {
      console.error(error);
      return Observable.throw(error);
  }

}
