import { TestBed } from '@angular/core/testing';

import { RoutinesService } from './routines.service';

describe('RoutinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutinesService = TestBed.get(RoutinesService);
    expect(service).toBeTruthy();
  });
});
