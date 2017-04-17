import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// ADMIN IMPORT
import { TournamentsComponent, TournamentsService } from './admin/tournaments/index';

// COMMON IMPORT
import { AlertService, AlertComponent } from './common/alert/index';
import { AuthGuard } from './common/guards/auth.guard';

// PUBLIC IMPORT
import { AuthenticationService } from './public/login/authentication/authentication.service';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';

// Define the routes
const ROUTES = [
  // PUBLIC URL
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: LoginComponent
  },

  // ADMIN URL
  {
    path: 'tournaments',
    component: TournamentsComponent,
    canActivate: [AuthGuard]
  },
  
  // otherwise redirect to home
  { path: '**',
    redirectTo: ''
  }

];

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthGuard, TournamentsService, AuthenticationService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
