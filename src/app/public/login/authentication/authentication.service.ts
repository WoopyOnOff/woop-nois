import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/index';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {

      let header = new Headers;
      header.append('Content-Type', 'application/json');
        return this.http.post(environment.hostnameServer+'/api/authenticate', JSON.stringify({ login: username, pwd: password }),
              { headers: header })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user: User = response.json();

                if (user && user.token) {
                    console.log('Connection OK!');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                else {
                  console.log('User empty or token empty');
                  return new Error('Login/Password incorrect');
                }
            });
    }

    verifyToken(token: string) {
      console.log('Verify the token');
      let header = new Headers;
      header.append('Content-Type', 'application/json');

      return this.http.post(environment.hostnameServer+'/api/authenticate/verify', JSON.stringify({ token: token }),
            { headers: header })
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let res = response.json();
              if (res.success == true) {
                  return true;
              }
              else {
                console.log('The token is not valid');
                return false;
              }
          });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
