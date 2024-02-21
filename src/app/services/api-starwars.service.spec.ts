import { TestBed } from '@angular/core/testing';

import { ApiStarwarsService } from './api-starwars.service';

describe('ApiStarwarsService', () => {
  let service: ApiStarwarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiStarwarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
