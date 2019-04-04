import { TestBed } from '@angular/core/testing';

import { FamillyService } from './familly.service';

describe('FamillyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamillyService = TestBed.get(FamillyService);
    expect(service).toBeTruthy();
  });
});
