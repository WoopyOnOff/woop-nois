import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../public/login/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isTokenValid: boolean;

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      var currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        // logged in. Need to verify the token
        var userInfos = JSON.parse(currentUser);
        return this.authenticationService.verifyToken(userInfos.token)
          .map(
            data =>
            {
              //console.log('verify Token : ' + data);
              if (!data) {
                //console.log('data == false');
                this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
                localStorage.removeItem('currentUser');
              }

              this.isTokenValid = data;
              return data;
            },
            error => {
              console.log("Error while verifying token");
              return false;

            }
          );
      }
      else{
        console.log('No User in local storage');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
      }

    }
}
