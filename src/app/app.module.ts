import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TournamentsService } from './tournaments/tournaments.service';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [TournamentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
