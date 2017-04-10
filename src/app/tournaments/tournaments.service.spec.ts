import { TestBed, inject } from '@angular/core/testing';

import { TournamentsService } from './tournaments.service';

describe('TournamentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentsService]
    });
  });

  it('should ...', inject([TournamentsService], (service: TournamentsService) => {
    expect(service).toBeTruthy();
  }));
});
