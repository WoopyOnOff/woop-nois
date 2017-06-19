import { TestBed, inject } from '@angular/core/testing';

import { ListTeamService } from './list-team.service';

describe('ListTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListTeamService]
    });
  });

  it('should ...', inject([ListTeamService], (service: ListTeamService) => {
    expect(service).toBeTruthy();
  }));
});
