import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute, MockRouter } from './mocks/routes';
import { MockTournamentsService } from './mocks/tournaments.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsComponent } from './tournaments.component';
import { TournamentsService } from './tournaments.service';


describe('TournamentsComponent', () => {
  let component: TournamentsComponent;
  let fixture: ComponentFixture<TournamentsComponent>;
  let mockTournamentsService: MockTournamentsService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockTournamentsService = new MockTournamentsService();
    mockActivatedRoute = new MockActivatedRoute();
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [ TournamentsComponent ],
      providers: [
        {provide: TournamentsService, useValue: mockTournamentsService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
