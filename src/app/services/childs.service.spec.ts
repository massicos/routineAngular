import { TestBed } from '@angular/core/testing';

import { ChildsService } from './childs.service';

describe('ChildsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChildsService = TestBed.get(ChildsService);
    expect(service).toBeTruthy();
  });
});
