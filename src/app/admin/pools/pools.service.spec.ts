import { TestBed, inject } from '@angular/core/testing';

import { PoolsService } from './pools.service';

describe('PoolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoolsService]
    });
  });

  it('should ...', inject([PoolsService], (service: PoolsService) => {
    expect(service).toBeTruthy();
  }));
});
