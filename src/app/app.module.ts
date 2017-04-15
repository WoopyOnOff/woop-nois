import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';

import { TournamentsService } from './tournaments/tournaments.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AlertService} from './alert/alert.service';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'tournaments',
    pathMatch: 'full'
  },
  {
    path: 'tournaments',
    component: TournamentsComponent
  },
  {
    path: 'admin',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [TournamentsService, AuthenticationService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
