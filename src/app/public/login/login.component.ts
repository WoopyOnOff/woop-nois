import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';
import { AlertService } from '../../common/alert/alert.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

    ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tournaments';
    }

    login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log('login respond data');
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));

          if ( currentUser != null ) {
            this.router.navigate([this.returnUrl]);
          }
          else {
            this.alertService.error("Login ou mot de passe incorrect");
            this.router.navigate(["/admin"]);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          console.log('login respond error');
          this.router.navigate(["/admin"]);
          this.loading = false;
        });
      }
    }
