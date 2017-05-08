import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// ADMIN IMPORT
import { TournamentsComponent, TournamentsService } from './admin/tournaments/index';
import { AdminHomeComponent } from './admin/home/home.component';
import { PoolsService } from './admin/pools/pools.service';

// COMMON IMPORT
import { AlertService, AlertComponent } from './common/alert/index';
import { AuthGuard } from './common/guards/auth.guard';

// PUBLIC IMPORT
import { AuthenticationService } from './public/login/authentication/authentication.service';


import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { EditTournamentComponent } from './admin/edit-tournament/edit-tournament.component';
import { ListPoolComponent } from './admin/pools/list-pool/list-pool.component';
import { EditPoolComponent } from './admin/pools/edit-pool/edit-pool.component';
import { PoolSelectionComponent } from './public/home/pool-selection/pool-selection.component';

// Define the routes
const ROUTES = [
  // PUBLIC URL
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'selection/:id',
    component: PoolSelectionComponent
  },
  {
    path: 'admin',
    component: LoginComponent
  },

  // ADMIN URL
  {
    path: 'tournaments',
    component: AdminHomeComponent,
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
    HomeComponent,
    AdminHomeComponent,
    EditTournamentComponent,
    ListPoolComponent,
    EditPoolComponent,
    PoolSelectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [AuthGuard,
    TournamentsService,
    AuthenticationService,
    AlertService,
    PoolsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
