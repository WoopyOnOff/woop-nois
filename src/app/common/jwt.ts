import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class JWT {

  constructor() {}

  public jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'x-access-token': currentUser.token });
          return headers;
      }

  }

}
