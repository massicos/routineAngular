import { TestBed } from '@angular/core/testing';

import { RoutinesListService } from './routines-list.service';

describe('RoutinesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutinesListService = TestBed.get(RoutinesListService);
    expect(service).toBeTruthy();
  });
});
